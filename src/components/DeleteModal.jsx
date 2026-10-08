import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  taskTitle = '' 
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
            <AlertTriangle size={20} />
            <h2 style={{ fontSize: '1.125rem' }}>Delete Task Confirmation</h2>
          </div>
          <button 
            type="button" 
            className="btn-icon" 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '12px' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            Are you sure you want to delete this task?
          </p>
          {taskTitle && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #ef4444' }}>
              &ldquo;{taskTitle}&rdquo;
            </p>
          )}
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
            This action cannot be undone and will permanently remove this task from your dashboard.
          </p>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
            id="cancel-delete-btn"
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={onConfirm}
            id="confirm-delete-btn"
            autoFocus
          >
            <Trash2 size={16} />
            <span>Delete Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};
