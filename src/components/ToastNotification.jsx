import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastNotification = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} color="var(--status-completed)" />}
          {toast.type === 'danger' && <AlertCircle size={18} color="#ef4444" />}
          {toast.type === 'info' && <Info size={18} color="var(--brand-primary)" />}

          <span style={{ flex: 1 }}>{toast.message}</span>

          <button
            type="button"
            className="search-clear-btn"
            style={{ position: 'static', padding: '2px' }}
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
