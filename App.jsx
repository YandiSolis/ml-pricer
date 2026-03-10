import { useState, useEffect } from 'react';
import Auth from './Auth';
import { 
  TrendingUp, LogOut, Package, PlusCircle, ExternalLink, 
  RefreshCw, Trash2, ArrowDownCircle, X, History, BarChart3, ShieldCheck, Users 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [url, setUrl] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  
  // Estados para Modales
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarGlobal, setMostrarGlobal] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  
  // Estados de Datos con inicializadores seguros
  const [datosGrafica, setDatosGrafica] = useState([]);
  const [stats, setStats] = useState({ totalUsuarios: 0, totalProductos: 0, ahorroTotal: 0, ultimoLog: null });
  const [usuarios, setUsuarios] = useState([]);
  const [prodSeleccionado, setProdSeleccionado] = useState(null);

  useEffect(() => { 
    if (userId && token) {
      obtenerProductos();
      if (rol === 'admin') cargarAdmin();
    }
  }, [userId, rol, token]);

  const cargarAdmin = async () => {
    try {
      const s = await fetch('http://localhost:3001/admin/stats');
      const dataS = await s.json();
      setStats(dataS);
      const u = await fetch('http://localhost:3001/admin/usuarios');
      const dataU = await u.json();
      setUsuarios(Array.isArray(dataU) ? dataU : []);
    } catch (e) { console.error("Error cargando panel admin"); }
  };

  const handleLoginSuccess = (t, u, r) => {
    localStorage.setItem('token', t);
    localStorage.setItem('userId', u);
    localStorage.setItem('rol', r || 'usuario'); // Por defecto usuario si viene vacío
    setToken(t);
    setUserId(u);
    setRol(r || 'usuario');
  };

  const suspender = async (id, estado) => {
    await fetch(`http://localhost:3001/admin/usuario-estado/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ suspendido: estado ? 0 : 1 })
    });
    cargarAdmin();
  };

  const obtenerProductos = async () => {
    try {
      const res = await fetch(`http://localhost:3001/productos/${userId}`);
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (e) { setProductos([]); }
  };

  const actualizarTodo = async () => {
    setCargando(true);
    try {
      await fetch(`http://localhost:3001/actualizar-todo/${userId}`, { method: 'PUT' });
      await obtenerProductos();
      if (rol === 'admin') cargarAdmin();
      alert("¡Todos los precios actualizados!");
    } catch (e) { alert("Error"); }
    finally { setCargando(false); }
  };

  const verAnalisisHistorico = async (p) => {
    const res = await fetch(`http://localhost:3001/historial/${p.id}`);
    const data = await res.json();
    setDatosGrafica(data);
    setProdSeleccionado(p);
    setMostrarHistorial(true);
  };

  const analizarLink = async () => {
    if (!url.includes('mercadolibre.com')) return alert("Enlace no válido");
    setCargando(true);
    try {
      const res = await fetch('http://localhost:3001/guardar-producto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: userId, url }),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error);
      else { setUrl(''); obtenerProductos(); if (rol === 'admin') cargarAdmin(); }
    } finally { setCargando(false); }
  };

  const eliminarProducto = async (id) => {
    if (confirm("¿Dejar de rastrear?")) {
      await fetch(`http://localhost:3001/eliminar-producto/${id}`, { method: 'DELETE' });
      obtenerProductos();
      if (rol === 'admin') cargarAdmin();
    }
  };

  const handleLogout = () => { localStorage.clear(); window.location.reload(); };

  if (!token) return <Auth onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-24">
      
      {/* BOTÓN FLOTANTE */}
      <button onClick={actualizarTodo} disabled={cargando} className="fixed bottom-8 right-8 z-40 bg-blue-600 hover:bg-blue-500 text-white p-5 rounded-full shadow-2xl transition-all active:scale-90 flex items-center gap-3 border-4 border-slate-900 group">
        <RefreshCw size={28} className={cargando ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
        <span className="font-black text-sm pr-2 italic">ACTUALIZAR TODO</span>
      </button>

      {/* NAVBAR */}
      <nav className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 p-4 sticky top-0 z-10 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black flex items-center gap-2 text-blue-400 italic tracking-tighter"><TrendingUp strokeWidth={3} /> PRICER-ML</h1>
            <button onClick={() => setMostrarGlobal(true)} className="flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all font-bold text-xs uppercase tracking-widest shadow-lg">
                <BarChart3 size={16} /> Global
            </button>
            {rol === 'admin' && (
                <button onClick={() => setMostrarAdmin(true)} className="flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-all font-black text-xs uppercase tracking-widest shadow-lg animate-pulse">
                    <ShieldCheck size={16} /> Mando
                </button>
            )}
        </div>
        <button onClick={handleLogout} className="text-red-400 bg-red-500/10 px-5 py-2.5 rounded-2xl border border-red-500/20 font-bold text-sm">Salir</button>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1">
          <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl sticky top-24 text-center">
            <h2 className="text-xl font-black mb-6 italic uppercase tracking-tighter">Nuevo Rastreo</h2>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Link de Mercado Libre..." className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-4 text-white outline-none focus:ring-2 focus:ring-blue-500 shadow-inner" />
            <button onClick={analizarLink} disabled={cargando} className="w-full bg-blue-600 hover:bg-blue-700 font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest">{cargando ? '...' : 'RASTREAR AHORA'}</button>
          </div>
        </section>

        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black flex items-center gap-3 uppercase tracking-tight italic"><Package className="text-blue-500" /> Mis Productos</h2>
          <div className="grid gap-5">
            {productos.map((p) => (
              <div key={p.id} className="bg-slate-800 p-6 rounded-[2.5rem] border border-slate-700 flex flex-col md:flex-row gap-6 items-center shadow-lg group relative overflow-hidden transition-all hover:border-blue-500/40">
                {p.precio_actual < p.precio_inicial && (
                  <div className="absolute top-0 right-0 bg-green-500 text-[10px] font-black px-5 py-1.5 rounded-bl-2xl text-slate-900 uppercase animate-pulse shadow-md">¡REBAJA!</div>
                )}
                <div className="w-28 h-28 bg-white rounded-3xl p-3 flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform"><img src={p.imagen_url} className="w-full h-full object-contain" alt="prod" /></div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-bold text-slate-100 text-lg line-clamp-1 mb-1">{p.nombre}</h3>
                  <p className="text-[10px] text-blue-400 font-black mb-4 uppercase tracking-widest bg-blue-400/5 px-2 py-0.5 rounded-md inline-block">Vendedor: {p.vendedor}</p>
                  <div className="flex gap-8 justify-center md:justify-start">
                    <div onClick={() => verAnalisisHistorico(p)} className="cursor-pointer group/price border-r border-slate-700 pr-8">
                      <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-tighter">Actual</p>
                      <p className={`text-2xl font-black flex items-center gap-1.5 ${p.precio_actual < p.precio_inicial ? 'text-green-400' : p.precio_actual > p.precio_inicial ? 'text-red-400' : 'text-blue-400'}`}>${p.precio_actual} {p.precio_actual < p.precio_inicial && <ArrowDownCircle size={20} className="animate-bounce" />}</p>
                    </div>
                    <div><p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-tighter">Registro</p><p className="text-2xl font-bold text-slate-400">${p.precio_inicial}</p></div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col gap-2">
                  <button onClick={() => verAnalisisHistorico(p)} className="p-3.5 bg-slate-900 text-purple-400 rounded-2xl border border-slate-700 hover:bg-purple-500 hover:text-white transition-all shadow-sm"><History size={18}/></button>
                  <a href={p.url_mercadolibre} target="_blank" rel="noreferrer" className="p-3.5 bg-slate-900 text-green-400 rounded-2xl border border-slate-700 hover:bg-green-500 hover:text-slate-900 transition-all shadow-sm"><ExternalLink size={18} /></a>
                  <button onClick={() => eliminarProducto(p.id)} className="p-3.5 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL ADMIN */}
      {mostrarAdmin && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-5xl rounded-[3rem] p-10 relative shadow-2xl">
<button onClick={() => setMostrarAdmin(false)} className="absolute top-6 right-6 p-3 bg-slate-700 hover:bg-red-500 rounded-full transition-all z-50">  <X size={24} /></button>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Central de Mando</h2>
                <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-slate-700 text-right">
                    <p className="text-[10px] text-slate-500 font-black uppercase">Último Robot</p>
                    <p className="text-sm font-mono text-green-400">{stats.ultimoLog ? new Date(stats.ultimoLog).toLocaleTimeString() : '---'}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
                <div className="bg-slate-900/50 p-8 rounded-3xl border-l-4 border-l-blue-500 shadow-inner">
                    <p className="text-slate-500 text-[10px] font-black uppercase">Usuarios</p>
                    <p className="text-5xl font-black">{stats.totalUsuarios}</p>
                </div>
                <div className="bg-slate-900/50 p-8 rounded-3xl border-l-4 border-l-purple-500 shadow-inner">
                    <p className="text-slate-500 text-[10px] font-black uppercase">Rastreos</p>
                    <p className="text-5xl font-black">{stats.totalProductos}</p>
                </div>
                <div className="bg-slate-900/50 p-8 rounded-3xl border-l-4 border-l-green-500 shadow-inner">
                    <p className="text-slate-500 text-[10px] font-black uppercase">Ahorro Total</p>
                    <p className="text-5xl font-black text-green-400">${Math.round(stats.ahorroTotal || 0)}</p>
                </div>
            </div>
            <div className="space-y-4">
                {usuarios.map(u => (
                    <div key={u.id} className={`flex items-center justify-between p-6 rounded-3xl border ${u.suspendido ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-900 border-slate-700'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${u.suspendido ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-green-500 shadow-[0_0_8px_green]'}`}></div>
                            <div>
                                <p className="font-bold">{u.email}</p>
                                <p className="text-[10px] text-blue-500 uppercase">{u.rol} • {u.totalRastreos} PRODUCTOS</p>
                            </div>
                        </div>
                        {u.email !== 'admin1@upv.edu.mx' && (
                            <button onClick={() => suspender(u.id, u.suspendido)} className={`px-6 py-2 rounded-xl font-black text-xs uppercase ${u.suspendido ? 'bg-green-500 text-slate-900' : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 transition-all'}`}>
                                {u.suspendido ? 'Reactivar' : 'Suspender'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL GLOBAL */}
      {mostrarGlobal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-5xl rounded-[2.5rem] p-10 relative shadow-2xl">
            <button onClick={() => setMostrarGlobal(false)} className="absolute top-6 right-6 p-2 bg-slate-700 hover:bg-red-500 rounded-full transition-all"><X/></button>
            <h2 className="text-3xl font-black mb-8 uppercase italic flex items-center gap-3"><BarChart3/> Análisis Comparativo</h2>
            <div className="h-96 w-full bg-slate-900/50 rounded-[2rem] p-6 border border-slate-700 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="nombre" hide />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none' }} formatter={(val) => [`$${val}`, "Precio"]} />
                  <Bar dataKey="precio_actual" radius={[10, 10, 0, 0]}>
                    {productos.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.precio_actual < entry.precio_inicial ? '#4ad991' : '#3b82f6'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL INDIVIDUAL */}
      {mostrarHistorial && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-4xl rounded-[2.5rem] p-8 relative shadow-2xl">
            <button onClick={() => setMostrarHistorial(false)} className="absolute top-6 right-6 p-2 bg-slate-700 hover:bg-red-500 rounded-full transition-all"><X size={20}/></button>
            <h3 className="text-xl font-black text-white mb-6 pr-10">{prodSeleccionado?.nombre}</h3>
            <div className="h-80 w-full bg-slate-900/50 rounded-3xl p-4 border border-slate-700 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={datosGrafica}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="fecha" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }} />
                  <Area type="monotone" dataKey="precio" stroke="#3b82f6" strokeWidth={4} fillOpacity={0.3} fill="#3b82f6" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;