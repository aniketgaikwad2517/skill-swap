import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { activeToast, hideToast } = useApp();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  const getBorder = () => {
    switch (activeToast.type) {
      case 'success': return 'border-emerald-500/40 shadow-glow-sm';
      case 'error': return 'border-rose-500/40';
      case 'warning': return 'border-amber-500/40';
      default: return 'border-cyan-500/40 shadow-glow-cyan';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-2xl bg-[#0F1220]/95 backdrop-blur-xl border ${getBorder()} shadow-2xl flex items-start gap-3`}>
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-white truncate">{activeToast.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
