"use client";
import React from 'react';
import { createContext, useContext, useState } from 'react';

interface Toast {
  id: number;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const context = useContext(ToastContext);

  if (!context) return null;

  const { toasts, removeToast } = context;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            ${toast.variant === 'destructive' ? 'bg-red-500' : 'bg-[#39D2E6]'}
            text-white rounded-lg p-4 shadow-lg 
            animate-slide-up min-w-[300px] max-w-md
            relative transform transition-all duration-300
          `}
        >
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            ×
          </button>
          <div className="font-semibold">{toast.title}</div>
          {toast.description && (
            <div className="text-sm text-white/90 mt-1">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const toast = (props: Omit<Toast, 'id'>) => {
    context.addToast(props);
  };

  return { toast };
}