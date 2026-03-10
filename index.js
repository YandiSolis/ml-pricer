import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const SECRET_KEY = "tu_clave_secreta_jonathan"; 

app.use(cors());
app.use(express.json());

// Conexión a XAMPP
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pricer_db'
});

db.connect((err) => {
  if (err) console.error('Error MySQL:', err);
  else console.log('¡Conectado a pricer_db en XAMPP!');
});

// --- FUNCIÓN SCRAPER MAESTRA ---
const extraerPrecioML = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept-Language': 'es-MX,es;q=0.9'
      }
    });
    const $ = cheerio.load(data);
    
    let precioRaw = $('meta[property="product:price:amount"]').attr('content') || 
                    $('.ui-pdp-price__second-line .andes-money-amount__fraction').first().text().replace(/[.,]/g, '') ||
                    $('.andes-money-amount__fraction').first().text().replace(/[.,]/g, '');

    return {
      precio: parseFloat(precioRaw) || 0,
      nombre: $('.ui-pdp-title').text().trim(),
      vendedor: $('.ui-pdp-seller__link-trigger, .ui-seller-info__title-main').first().text().trim() || "Tienda Oficial",
      imagenUrl: $('img.ui-pdp-image.ui-pdp-gallery__figure__image').attr('src') || $('.ui-pdp-gallery__figure__image').attr('src')
    };
  } catch (e) { 
    console.error("Error al scrapear:", url);
    return null; 
  }
};

// --- RUTAS AUTH (Actualizadas con Roles y Suspensión) ---
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // SQL insertará 'usuario' por defecto según el comando ALTER que corriste
    db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [req.body.email, hashedPassword], (err) => {
      if (err) return res.status(500).send({ error: "El correo ya existe" });
      res.send({ message: "Usuario registrado" });
    });
  } catch (e) { res.status(500).send(e); }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err || result.length === 0) return res.status(401).send({ error: "No encontrado" });
    
    // Validar si el usuario está suspendido
    if (result[0].suspendido === 1) {
      return res.status(403).send({ error: "Esta cuenta ha sido suspendida por el administrador." });
    }

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) return res.status(401).send({ error: "Incorrecto" });
    
    const token = jwt.sign({ id: result[0].id, rol: result[0].rol }, SECRET_KEY, { expiresIn: '24h' });
    res.send({ 
      token, 
      userId: result[0].id, 
      rol: result[0].rol // Muy importante para el frontend
    });
  });
});

// --- RUTAS EXCLUSIVAS DE ADMIN ---

// 1. Estadísticas Globales (Ahorro, Usuarios, Productos)
app.get('/admin/stats', (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM usuarios) as totalUsuarios,
      (SELECT COUNT(*) FROM productos) as totalProductos,
      (SELECT SUM(precio_inicial - precio_actual) FROM productos WHERE precio_actual < precio_inicial) as ahorroTotal,
      (SELECT fecha FROM sistema_logs ORDER BY fecha DESC LIMIT 1) as ultimoLog
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });
});

// 2. Lista de Usuarios para gestión
app.get('/admin/usuarios', (req, res) => {
  const sql = `
    SELECT u.id, u.email, u.rol, u.suspendido, COUNT(p.id) as totalRastreos 
    FROM usuarios u 
    LEFT JOIN productos p ON u.id = p.usuario_id 
    GROUP BY u.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// 3. Cambiar estado de suspensión
app.put('/admin/usuario-estado/:id', (req, res) => {
  const { id } = req.params;
  const { suspendido } = req.body;
  db.query("UPDATE usuarios SET suspendido = ? WHERE id = ?", [suspendido, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Estado de usuario actualizado" });
  });
});

// --- RUTAS DE PRODUCTOS ---
app.post('/guardar-producto', async (req, res) => {
  const { usuario_id, url } = req.body;
  db.query("SELECT id FROM productos WHERE usuario_id = ? AND url_mercadolibre = ?", [usuario_id, url], async (err, result) => {
    if (result && result.length > 0) return res.status(400).send({ error: "Ya estás rastreando este producto, Jonathan." });

    const info = await extraerPrecioML(url);
    if (!info) return res.status(500).send({ error: "No se pudo leer el producto" });

    const sql = "INSERT INTO productos (usuario_id, nombre, precio_actual, precio_inicial, url_mercadolibre, imagen_url, vendedor) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [usuario_id, info.nombre, info.precio, info.precio, url, info.imagenUrl, info.vendedor], (err, resInsert) => {
      if (err) return res.status(500).send(err);
      db.query("INSERT INTO historial_precios (producto_id, precio) VALUES (?, ?)", [resInsert.insertId, info.precio]);
      res.send({ message: "Guardado", datos: info });
    });
  });
});

app.delete('/eliminar-producto/:id', (req, res) => {
  db.query("DELETE FROM productos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Eliminado" });
  });
});

app.get('/productos/:userId', (req, res) => {
  db.query("SELECT * FROM productos WHERE usuario_id = ? ORDER BY fecha_registro DESC", [req.params.userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.get('/historial/:id', (req, res) => {
  const sql = "SELECT precio, DATE_FORMAT(fecha_registro, '%d/%m %H:%i') as fecha FROM historial_precios WHERE producto_id = ? ORDER BY fecha_registro ASC LIMIT 30";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.put('/actualizar-todo/:userId', (req, res) => {
  const { userId } = req.params;
  db.query("SELECT id, url_mercadolibre, precio_actual FROM productos WHERE usuario_id = ?", [userId], async (err, productos) => {
    if (err) return res.status(500).send(err);
    
    for (const p of productos) {
      const info = await extraerPrecioML(p.url_mercadolibre);
      if (info && info.precio !== p.precio_actual) {
        db.query("UPDATE productos SET precio_actual = ? WHERE id = ?", [info.precio, p.id]);
        db.query("INSERT INTO historial_precios (producto_id, precio) VALUES (?, ?)", [p.id, info.precio]);
      }
    }
    // Loguear la actividad manual
    db.query("INSERT INTO sistema_logs (evento, detalles) VALUES (?, ?)", ['Actualización Manual', `Usuario ${userId} forzó actualización.`]);
    res.send({ message: "Sincronización masiva completada" });
  });
});

// --- MONITOR AUTOMÁTICO CON REGISTRO DE LOGS ---
setInterval(() => {
  console.log(`[${new Date().toLocaleTimeString()}] Verificando movimientos automáticos...`);
  db.query("SELECT id, url_mercadolibre, precio_actual FROM productos", async (err, productos) => {
    if (err || !productos) return;
    let cambiosContador = 0;
    for (const prod of productos) {
      const info = await extraerPrecioML(prod.url_mercadolibre);
      if (info && info.precio !== prod.precio_actual) {
        db.query("UPDATE productos SET precio_actual = ? WHERE id = ?", [info.precio, prod.id]);
        db.query("INSERT INTO historial_precios (producto_id, precio) VALUES (?, ?)", [prod.id, info.precio]);
        cambiosContador++;
      }
    }
    // Guardar log en la base de datos
    db.query("INSERT INTO sistema_logs (evento, detalles) VALUES (?, ?)", 
      ['Rastreo Automático', `Se revisaron ${productos.length} productos. Cambios detectados: ${cambiosContador}`]);
  });
}, 15 * 60 * 1000);

app.listen(3001, () => console.log("Servidor Pricer-ML listo en puerto 3001"));