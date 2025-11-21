import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CloudRain, 
  Thermometer, 
  BarChart2, 
  Settings, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Wind, 
  Brain, 
  ArrowDown,
  Play,
  Pause,
  ShieldCheck,
  FileText
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

// Botón Genérico Estilizado
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "w-full py-4 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-100 text-red-600 border border-red-200"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

// Tarjeta de Contenedor
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 ${className}`}>
    {children}
  </div>
);

// --- PANTALLAS PRINCIPALES ---

// 1. PANTALLA DE ONBOARDING (CUJ 1)
const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [permissions, setPermissions] = useState({ location: false, health: false, notifications: false });

  const handlePermission = (type) => {
    setPermissions(prev => ({...prev, [type]: true}));
  };

  const steps = [
    {
      title: "Baro-Resilience Spine",
      desc: "Tu dolor de espalda es real. La presión atmosférica también. Aprende a neutralizar su efecto.",
      icon: <CloudRain size={64} className="text-blue-500" />
    },
    {
      title: "Fase de Diagnóstico",
      desc: "Durante las próximas 2 semanas, necesitamos entender tu dolor. Analizaremos cómo el clima y tu estrés interactúan.",
      icon: <Activity size={64} className="text-teal-500" />
    },
    {
      title: "Permisos Necesarios",
      desc: "Para que esto funcione, necesitamos acceso a tus sensores.",
      isPermission: true
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-slate-50">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="p-8 bg-white rounded-full shadow-xl mb-6 animate-bounce-slow">
          {steps[step].icon || <ShieldCheck size={64} className="text-indigo-500" />}
        </div>
        <h1 className="text-2xl font-bold text-slate-800">{steps[step].title}</h1>
        <p className="text-slate-500 leading-relaxed px-4">{steps[step].desc}</p>

        {steps[step].isPermission && (
          <div className="w-full space-y-3 mt-4 text-left">
            <div 
              onClick={() => handlePermission('location')}
              className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${permissions.location ? 'bg-green-50 border-green-500' : 'bg-white border-slate-200'}`}
            >
              <Wind size={20} />
              <div className="flex-1">
                <p className="font-semibold">Ubicación Precisa</p>
                <p className="text-xs text-slate-500">Para datos barométricos locales</p>
              </div>
              {permissions.location && <CheckCircle size={20} className="text-green-600" />}
            </div>
            
            <div 
              onClick={() => handlePermission('health')}
              className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${permissions.health ? 'bg-green-50 border-green-500' : 'bg-white border-slate-200'}`}
            >
              <Activity size={20} />
              <div className="flex-1">
                <p className="font-semibold">Apple Health / Google Fit</p>
                <p className="text-xs text-slate-500">Para VFC y Sueño</p>
              </div>
              {permissions.health && <CheckCircle size={20} className="text-green-600" />}
            </div>
          </div>
        )}
      </div>

      <div className="pt-6">
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i === step ? 'bg-blue-600 w-6' : 'bg-slate-300'}`} />
          ))}
        </div>
        <Button 
          onClick={() => {
            if (step < steps.length - 1) setStep(step + 1);
            else onComplete();
          }}
          disabled={steps[step].isPermission && (!permissions.location || !permissions.health)}
        >
          {step === steps.length - 1 ? "Comenzar Fenotipado" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};

// 2. PANTALLA DE REGISTRO DIARIO (CUJ 2 - EMA)
const EMALogger = ({ onLogComplete, onClose }) => {
  const [painLevel, setPainLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(3);
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-up">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Registro Rápido</h2>
        <button onClick={onClose} className="text-slate-400">Cerrar</button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-8">
        <section>
          <label className="block text-sm font-semibold text-slate-600 mb-4">
            ¿Cuánto te duele la espalda ahora?
          </label>
          <div className="flex justify-between text-2xl font-bold text-blue-600 mb-2">
            <span>0</span>
            <span>{painLevel}</span>
            <span>10</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={painLevel} 
            onChange={(e) => setPainLevel(parseInt(e.target.value))}
            className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Sin dolor</span>
            <span>Insoportable</span>
          </div>
        </section>

        <section>
          <label className="block text-sm font-semibold text-slate-600 mb-4">
            Nivel de estrés / Ansiedad actual
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setStressLevel(level)}
                className={`h-12 rounded-lg font-bold transition-colors ${
                  stressLevel === level 
                    ? 'bg-teal-500 text-white shadow-lg' 
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-2">
            {stressLevel === 1 ? "Muy relajado" : stressLevel === 5 ? "Pánico / Estrés Alto" : "Moderado"}
          </p>
        </section>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50">
        <Button onClick={() => onLogComplete({ pain: painLevel, stress: stressLevel })}>
          Guardar Registro
        </Button>
      </div>
    </div>
  );
};

// 3. PANTALLA DE INTERVENCIÓN (CUJ 3 - Alerta de Tormenta)
const InterventionScreen = ({ weatherData, onFinish }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  
  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="h-full bg-gradient-to-b from-indigo-900 to-slate-900 text-white flex flex-col p-6">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onFinish} className="text-indigo-200 hover:text-white">Salir</button>
        <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium flex items-center gap-2">
          <ArrowDown size={14} className="text-red-300" />
          Presión cayendo: {weatherData.pressure} hPa
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Escudo de Resiliencia</h2>
          <p className="text-indigo-200">Imagina tus discos vertebrales hidratados y fuertes frente al cambio de presión.</p>
        </div>

        {/* Visualizador de Biofeedback Simulado */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className={`absolute inset-0 bg-indigo-500/30 rounded-full blur-xl transition-all duration-[4000ms] ease-in-out ${isPlaying ? 'scale-150 opacity-50' : 'scale-100 opacity-20'}`}></div>
          <div className={`w-48 h-48 border-4 border-indigo-400 rounded-full flex items-center justify-center relative transition-all duration-[4000ms] ease-in-out ${isPlaying ? 'scale-110' : 'scale-100'}`}>
             <div className="text-4xl font-light font-mono">
               {formatTime(timeLeft)}
             </div>
          </div>
        </div>

        <div className="w-full max-w-xs bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-indigo-200">VFC (Variabilidad Cardíaca)</span>
            <span className="text-sm font-bold text-green-400">55 ms</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 w-[60%] animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <Button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-indigo-500 hover:bg-indigo-400 shadow-indigo-900/50 text-white border-none"
        >
          {isPlaying ? <><Pause size={20} /> Pausar Sesión</> : <><Play size={20} /> Iniciar Audio-Guía</>}
        </Button>
      </div>
    </div>
  );
};

// 4. DASHBOARD PRINCIPAL (Hub Central)
const Dashboard = ({ phase, onLogPress, logs, weather, onSimulateDrop, onSimulateResult }) => {
  const isPhase1 = phase === 'diagnostic';

  return (
    <div className="h-full bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white p-6 pb-4 shadow-sm z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Hola, Carlos</h1>
            <p className="text-sm text-slate-500">
              {isPhase1 ? "Día 4 de Fenotipado" : "Modo Resiliencia Activado"}
            </p>
          </div>
          <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <User size={20} />
          </div>
        </div>
        
        {/* Widget del Tiempo */}
        <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
          <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
            {weather.trend === 'falling' ? <CloudRain size={24} /> : <Wind size={24} />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-800 uppercase tracking-wide">Presión Atmosférica</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-700">{weather.pressure}</span>
              <span className="text-xs text-slate-500">hPa</span>
              {weather.trend === 'falling' && (
                <span className="text-xs font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded flex items-center">
                  <ArrowDown size={10} className="mr-1" /> Cayendo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Estado del Programa */}
        {isPhase1 ? (
          <Card className="border-l-4 border-l-teal-500">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Activity size={18} className="text-teal-500" />
              Recopilando Datos
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Necesitamos 10 días más de datos para generar tu fenotipo de dolor. Sigue registrando.
            </p>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
              <div className="bg-teal-500 h-2 rounded-full w-[30%]"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Progreso</span>
              <span>30%</span>
            </div>
          </Card>
        ) : (
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
             <h3 className="font-bold mb-2 flex items-center gap-2">
              <Brain size={18} />
              Fenotipo: Amplificado
            </h3>
            <p className="text-sm text-indigo-100 opacity-90">
              Tu dolor reacciona al miedo anticipatorio. Hemos preparado tus ejercicios para la tormenta de mañana.
            </p>
          </Card>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={onLogPress} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all">
            <div className="p-3 bg-orange-100 text-orange-500 rounded-full">
              <FileText size={24} />
            </div>
            <span className="font-semibold text-sm text-slate-700">Registrar Dolor</span>
          </button>
          
          <button className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:bg-slate-50 active:scale-95 transition-all opacity-50 cursor-not-allowed">
            <div className="p-3 bg-indigo-100 text-indigo-500 rounded-full">
              <BarChart2 size={24} />
            </div>
            <span className="font-semibold text-sm text-slate-700">Reportes</span>
          </button>
        </div>

        {/* Lista de Logs Recientes */}
        <div>
          <h3 className="font-bold text-slate-800 mb-3">Actividad Reciente</h3>
          {logs.length === 0 ? (
             <p className="text-sm text-slate-400 text-center py-4">No hay registros hoy.</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-10 rounded-full ${log.pain > 6 ? 'bg-red-400' : 'bg-green-400'}`}></div>
                    <div>
                      <p className="font-bold text-slate-700">Dolor: {log.pain}/10</p>
                      <p className="text-xs text-slate-400">Hace un momento</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500">Presión</p>
                    <p className="text-sm font-bold text-slate-700">{log.pressure} hPa</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- SIMULATION CONTROLS (DEBUG) --- */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">Simulación / Debug</p>
          <div className="space-y-2">
            <Button variant="outline" onClick={onSimulateDrop} className="text-sm py-2 border-dashed">
               ⚡ Simular Caída de Presión (Alerta)
            </Button>
             <Button variant="secondary" onClick={() => onSimulateResult(true)} className="text-sm py-2">
               🔬 Simular Fenotipo: Apto (Resiliencia)
            </Button>
            <Button variant="secondary" onClick={() => onSimulateResult(false)} className="text-sm py-2">
               🏥 Simular Fenotipo: Mecánico (Derivar)
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

// 5. PANTALLA DE RESULTADOS (CUJ 4)
const ResultScreen = ({ isEligible, onReset }) => {
  return (
    <div className="h-full bg-white flex flex-col p-6 text-center justify-center animate-fade-in">
      <div className="mb-6 flex justify-center">
        {isEligible ? (
          <div className="bg-green-100 p-6 rounded-full text-green-600 mb-4"><Brain size={64} /></div>
        ) : (
           <div className="bg-orange-100 p-6 rounded-full text-orange-600 mb-4"><Settings size={64} /></div>
        )}
      </div>
      
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        {isEligible ? "Fenotipo: Psicofisiológico" : "Fenotipo: Biomecánico"}
      </h1>
      
      <p className="text-slate-500 mb-8 leading-relaxed">
        {isEligible 
          ? "Hemos detectado una fuerte correlación entre tu estrés, la presión barométrica y tu dolor. Eres el candidato ideal para el Programa de Baro-Resiliencia." 
          : "Tu dolor parece estar relacionado estrictamente con factores mecánicos y no muestra amplificación por estrés. Te recomendamos visitar a un especialista en columna."}
      </p>

      <div className="space-y-3">
        {isEligible ? (
          <Button onClick={onReset}>Comenzar Entrenamiento Mental</Button>
        ) : (
          <>
            <Button variant="outline">Descargar Informe PDF</Button>
            <Button variant="secondary" onClick={onReset}>Volver al Inicio</Button>
          </>
        )}
      </div>
    </div>
  );
};


// --- APP PRINCIPAL ---

export default function App() {
  // State Machine
  const [view, setView] = useState('onboarding'); // onboarding, dashboard, logging, intervention, result
  const [phase, setPhase] = useState('diagnostic'); // diagnostic, active
  const [logs, setLogs] = useState([]);
  const [weather, setWeather] = useState({ pressure: 1013, trend: 'stable' });
  
  // Simulation Handlers
  const handleOnboardingComplete = () => {
    setView('dashboard');
  };

  const handleLogSave = (data) => {
    const newLog = { ...data, pressure: weather.pressure, timestamp: new Date() };
    setLogs([newLog, ...logs]);
    setView('dashboard');
  };

  const simulatePressureDrop = () => {
    setWeather({ pressure: 998, trend: 'falling' });
    // En una app real, esto sería una notificación push
    setTimeout(() => {
        alert("⚠️ ALERTA DE PRESIÓN: Se detecta una caída rápida. Tu espalda podría reaccionar.");
        setView('intervention');
    }, 500);
  };

  const simulatePhenotypeResult = (isEligible) => {
    if (isEligible) {
      setPhase('active');
      setView('dashboard'); // O mostrar pantalla de éxito
    } else {
      setView('result_ineligible');
    }
  };

  // Render Router
  const renderView = () => {
    switch(view) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard 
          phase={phase} 
          logs={logs} 
          weather={weather}
          onLogPress={() => setView('logging')} 
          onSimulateDrop={simulatePressureDrop}
          onSimulateResult={simulatePhenotypeResult}
        />;
      case 'logging':
        return <EMALogger onLogComplete={handleLogSave} onClose={() => setView('dashboard')} />;
      case 'intervention':
        return <InterventionScreen weatherData={weather} onFinish={() => {
          setWeather({ pressure: 1002, trend: 'stable' }); // Resetear clima tras intervención
          setView('dashboard');
        }} />;
      case 'result_ineligible':
        return <ResultScreen isEligible={false} onReset={() => {
          setPhase('diagnostic');
          setView('onboarding');
        }} />;
      default:
        return <div>Error de estado</div>;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-[600px] md:h-[800px] bg-white shadow-2xl overflow-hidden relative font-sans text-slate-900 border border-slate-200 md:rounded-[3rem]">
      {renderView()}
    </div>
  );
}