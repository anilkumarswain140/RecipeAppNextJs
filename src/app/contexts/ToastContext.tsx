import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // Toast duration
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div style={toastContainerStyle}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            ...toastStyle,
            backgroundColor: toast.type === 'success' ? 'green' : 'red',
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

const toastContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 20,
  right: 20,
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column', // Fixed to use valid type
  gap: 10,
};

const toastStyle: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: 5,
  color: 'white',
  fontSize: 14,
  width: 'auto',
  maxWidth: 300,
  textAlign: 'center',
  transition: 'opacity 0.5s ease',
};
