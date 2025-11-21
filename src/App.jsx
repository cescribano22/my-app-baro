import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CloudRain, 
  BarChart2, 
  User, 
  CheckCircle, 
  Wind, 
  Brain, 
  ArrowDown,
  Play,
  Pause,
  ShieldCheck,
  FileText,
  Settings,
  ChevronRight,
  Home,
  Menu
} from 'lucide-react';

// --- SYSTEM UI COMPONENTS (Diseño Premium) ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon: Icon }) => {
  const baseStyle = "w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3 shadow-md";
  
  const variants = {
    primary: "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700",
    secondary: "bg-white text-slate-700 border border-slate-100 hover:bg-slate-50",
    ghost: "bg-transparent text-indigo-600 shadow-none hover:bg-indigo-50",
    danger: "bg-rose-50 text-rose-600 border border-rose-100"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
      {Icon && <Icon size={20} />}
    </button>
  );
};

const Widget = ({ title, value, sub, icon: Icon, colorClass = "bg-white", textClass = "text-slate-800" }) => (
  <div className={`${colorClass} p-5 rounded-3xl shadow-sm border border-slate-50 flex flex-col justify-between h-32 relative overflow-hidden group active:scale-95 transition-transform`}>
    <div className="flex justify-between items-start z-10">
      <span className={`font-medium text-sm opacity-80 ${textClass}`}>{title}</span>
      {Icon && <Icon size={20} className={textClass} />}
    </div>
    <div className="z-10">
      <h3 className={`text-2xl font-bold ${textClass}`}>{value}</h3>
      {sub && <p className={`text-xs opacity-70 mt-1 ${textClass}`}>{sub}</p>}
    </div>
    {/* Decoración de fondo */}
    <div className="absolute -bottom-4 -right-4 opacity-10 z-0 transform rotate-12 group-hover:scale-110 transition-transform">
      {Icon && <Icon size={80} />}
    </div>
  </div>
);

// --- PANTALLAS PRINCIPALES ---

const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Controla tu dolor",
      desc: "Descubre cómo la presión atmosférica afecta a tu columna y aprende a anticiparte.",
      bg: "bg-indigo-50",
      img: <CloudRain size={120} className="text-indigo-500 drop-shadow-xl" />
    },
    {
      title: "Fenotipado Digital",
      desc: "Durante 2 semanas, nuestra IA analizará tus patrones de dolor y estrés.",
      bg: "bg-teal-50",
      img: <Activity size={120} className="text-teal-500 drop-shadow-xl" />
    },
    {
      title: "Todo listo",
      desc: "Necesitamos acceso a tus sensores para comenzar el análisis.",
      bg: "bg-blue-50",
      img: <ShieldCheck size={120} className="text-blue-500 drop-shadow-xl" />
    }
  ];

  return (
    <div className={`flex flex-col h-full w-full ${steps[step].bg} transition-colors duration-500`}>
      {/* Área Visual Superior */}
      <div className="flex-1 flex items-center justify-center p-10 pb-0">
        <div className="animate-float">
          {steps[step].img}
        </div>
      </div>

      {/* Tarjeta Inferior Tipo "Sheet" */}
      <div className="bg-white rounded-t-[2.5rem] p-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center space-y-6 h-[45%] justify-between">
        <div className="space-y-4 mt-2">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {steps[step].title}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            {steps[step].desc}
          </p>
        </div>

        <div className="w-full space-y-6">
          {/* Indicadores de Pagina */}
          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>

          <Button 
            onClick={() => step < 2 ? setStep(step + 1) : onComplete()}
            icon={ChevronRight}
          >
            {step === 2 ? "Comenzar" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ phase, onLogPress, weather, onSimulateDrop }) => {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative">
      {/* Header Premium */}
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2rem] shadow-sm z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Bienvenido</p>
            <h1 className="text-2xl font-bold text-slate-900">Carlos Escribano</h1>
          </div>
          <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
            <User size={24} className="text-slate-600" />
          </div>
        </div>

        {/* Widget Clima Principal */}
        <div className={`p-5 rounded-3xl text-white shadow-lg transition-all ${weather.trend === 'falling' ? 'bg-gradient-to-br from-rose-500 to-orange-600 shadow-rose-200' : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-200'}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="opacity-90 font-medium mb-1">Presión Atmosférica</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{weather.pressure}</span>
                <span className="text-lg opacity-80">hPa</span>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              {weather.trend === 'falling' ? <ArrowDown size={24} /> : <Wind size={24} />}
            </div>
          </div>
          {weather.trend === 'falling' && (
            <div className="mt-4 bg-white/20 px-3 py-2 rounded-xl backdrop-blur-md text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Alerta: Presión cayendo rápidamente</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenido Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {/* Estado del Programa */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-800 text-lg">Tu Progreso</h3>
          <span className="text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1 rounded-full">Día 4/14</span>
        </div>
        
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
              <Activity size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Fase de Diagnóstico</h4>
              <p className="text-xs text-slate-400">Recopilando biomarcadores</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full w-[30%] rounded-full shadow-sm"></div>
          </div>
        </div>

        {/* Grid de Acciones */}
        <h3 className="font-bold text-slate-800 text-lg mt-6">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-4">
          <Widget 
            title="Registrar" 
            value="Dolor" 
            icon={FileText} 
            colorClass="bg-indigo-600" 
            textClass="text-white"
            sub="Toque para añadir"
          />
          {/* Hack para simular click en widget (en React Native usaríamos TouchableOpacity) */}
          <div onClick={onLogPress} className="absolute opacity-0 w-1/2 h-32 left-6 mt-10 cursor-pointer z-20"></div> 

          <Widget 
            title="Reportes" 
            value="Semanal" 
            icon={BarChart2} 
          />
        </div>

        <Button variant="secondary" onClick={onSimulateDrop} className="mt-4 text-sm py-3">
          ⚡ Simular Cambio de Presión
        </Button>
      </div>

      {/* Bottom Navigation Bar (Simulada) */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-8 py-4 pb-8 rounded-t-[2rem] flex justify-between items-center text-slate-400 z-20">
        <div className="flex flex-col items-center gap-1 text-indigo-600">
          <Home size={24} />
          <span className="text-[10px] font-bold">Inicio</span>
        </div>
        <div className="p-4 bg-indigo-600 rounded-full -mt-12 shadow-lg shadow-indigo-300 border-4 border-slate-50 text-white">
          <Activity size={28} />
        </div>
        <div className="flex flex-col items-center gap-1 hover:text-slate-600">
          <Menu size={24} />
          <span className="text-[10px] font-bold">Menú</span>
        </div>
      </div>

      {/* Botón Flotante Real para Registrar (Overlay) */}
      <button 
        onClick={onLogPress}
        className="absolute bottom-24 right-6 h-14 w-14 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-300 text-white flex items-center justify-center z-30 active:scale-90 transition-transform"
      >
        <FileText size={24} />
      </button>
    </div>
  );
};

const InterventionScreen = ({ weatherData, onFinish }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-900 to-indigo-950 text-white flex flex-col relative overflow-hidden">
      {/* Fondo animado sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-8">
        <div className="flex justify-between items-center pt-4">
          <button onClick={onFinish} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
            <ArrowDown size={20} className="text-white rotate-90" />
          </button>
          <div className="px-4 py-1.5 bg-rose-500/20 border border-rose-500/30 rounded-full text-xs font-bold text-rose-200 flex items-center gap-2">
            <ArrowDown size={12} />
            {weatherData.pressure} hPa
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Escudo de Resiliencia</h2>
            <p className="text-indigo-200 text-lg max-w-xs mx-auto leading-relaxed">
              La presión baja, pero tu columna se mantiene fuerte e hidratada.
            </p>
          </div>

          {/* Círculo de Respiración */}
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative cursor-pointer transition-all duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
          >
            <div className={`absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl transition-all duration-[4000ms] ${isPlaying ? 'scale-150 opacity-60' : 'scale-75 opacity-20'}`}></div>
            
            {/* Botón Play Central */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] z-20 transition-transform hover:scale-110">
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </div>
          </div>
        </div>

        <div className="pb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/5">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                 <Activity size={20} />
               </div>
               <div>
                 <p className="text-xs text-indigo-200">Biofeedback (VFC)</p>
                 <p className="font-mono font-bold text-lg">55 ms</p>
               </div>
             </div>
             <div className="h-8 w-px bg-white/10"></div>
             <div className="text-right">
               <p className="text-xs text-indigo-200">Estado</p>
               <p className="font-bold text-green-400">Regulando</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL (Lógica + Marco) ---

export default function App() {
  const [view, setView] = useState('onboarding');
  const [weather, setWeather] = useState({ pressure: 1013, trend: 'stable' });

  // Simulaciones
  const simulatePressureDrop = () => {
    setWeather({ pressure: 998, trend: 'falling' });
    // Simulamos notificación nativa
    setTimeout(() => setView('intervention'), 800);
  };

  const renderView = () => {
    switch(view) {
      case 'onboarding': return <OnboardingScreen onComplete={() => setView('dashboard')} />;
      case 'dashboard': return <Dashboard phase="diagnostic" onLogPress={() => alert("Logger abierto (Simulado)")} weather={weather} onSimulateDrop={simulatePressureDrop} />;
      case 'intervention': return <InterventionScreen weatherData={weather} onFinish={() => { setWeather({pressure:1013, trend:'stable'}); setView('dashboard'); }} />;
      default: return <Dashboard weather={weather} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-0 md:p-4 font-sans text-slate-900">
      {/* MARCO DEL TELÉFONO PREMIUM */}
      <div className="
        w-full h-full                     
        md:h-[min(880px,95vh)]            
        md:max-w-[400px]                  
        md:rounded-[3rem]                 
        md:border-[12px] md:border-[#1a1a1a] /* Marco negro mate */
        md:ring-1 md:ring-slate-700/50       /* Sombra exterior sutil */
        bg-white                          
        shadow-2xl 
        overflow-hidden 
        relative 
        flex flex-col
      ">
        {/* Isla Dinámica / Notch */}
        <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-[#1a1a1a] rounded-b-2xl z-50 items-center justify-center">
           <div className="w-12 h-1.5 bg-gray-800 rounded-full opacity-30"></div>
        </div>

        {renderView()}
      </div>
    </div>
  );
}