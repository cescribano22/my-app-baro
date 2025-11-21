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