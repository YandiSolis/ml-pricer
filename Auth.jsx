import React, { useState, useEffect } from 'react';
import { Lock, Mail, UserPlus, LogIn, RefreshCw } from 'lucide-react';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  // Limpiar campos al cambiar entre login y registro para evitar estados mezclados
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    // Quitamos la barra inicial si ya la tienes en la URL base, 
    // pero aquí la dejamos para asegurar la ruta correcta
    const endpoint = isLogin ? '/login' : '/register';
    
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (isLogin) {
          // IMPORTANTE: Aseguramos que el rol no sea undefined
          // Si el servidor no lo envía por error, le asignamos 'usuario' por defecto
          const rolFinal = data.rol || 'usuario';
          onLoginSuccess(data.token, data.userId, rolFinal);
        } else {
          alert("¡Cuenta creada con éxito, Jonathan! Ahora ya puedes entrar.");
          setIsLogin(true);
        }
      } else {
        // Mostramos el error específico que viene del servidor (ej: "Cuenta suspendida")
        alert(data.error || 'Ocurrió un error inesperado');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Verifica que el servidor (XAMPP + Node.js) esté encendido.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-100 p-4">
      <div className="w-full max-w-md bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl border border-slate-700 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20 text-blue-400">
            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            {isLogin ? '¡Bienvenido!' : 'Nuevo Miembro'}
          </h2>
          <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">
            Pricer-ML • Control de Ofertas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Tu correo institucional o personal"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Tu contraseña secreta"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-900/40 mt-6 uppercase tracking-widest text-sm"
          >
            {cargando ? (
              <RefreshCw className="animate-spin" />
            ) : (
              isLogin ? 'Iniciar Sesión' : 'Registrar Cuenta'
            )}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-700/50 pt-8">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            {isLogin ? '¿Aún no tienes acceso?' : '¿Ya eres parte del equipo?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 font-black ml-2 hover:text-blue-300 transition-colors underline decoration-blue-500/30 underline-offset-4"
            >
              {isLogin ? 'Regístrate aquí' : 'Entra con tu cuenta'}
            </button>
          </p>
        </div>
      </div>
      
      <p className="mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
        Desarrollado por Jonathan • 2026
      </p>
    </div>
  );
};

export default Auth;