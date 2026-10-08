import React from 'react';
import { X } from 'lucide-react';

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Delete Task</h3>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontWeight: 500 }}>
            Are you sure you want to delete this task?
          </p>
          {taskTitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              &ldquo;{taskTitle}&rdquo;
            </p>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
