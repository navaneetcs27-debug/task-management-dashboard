import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Plus, Check } from 'lucide-react';

export const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'Pending',
        priority: initialData.priority || 'Medium',
        dueDate: initialData.dueDate || ''
      });
    } else {
      // Default to empty for new task
      const todayStr = new Date().toISOString().split('T')[0];
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: todayStr
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  // Handle ESC key to close modal
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

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required.';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority selection is required.';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      // Clear error as user types
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'title' && !formData.title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'Task title is required.' }));
    }
    if (field === 'description' && !formData.description.trim()) {
      setErrors((prev) => ({ ...prev, description: 'Task description is required.' }));
    }
    if (field === 'dueDate' && !formData.dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: 'Due date is required.' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      title: true,
      description: true,
      priority: true,
      dueDate: true
    });

    if (validate()) {
      onSave({
        ...formData,
        id: initialData ? initialData.id : Date.now(),
        createdAt: initialData ? initialData.createdAt : new Date().toISOString().split('T')[0]
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
          <button 
            type="button" 
            className="btn-icon" 
            onClick={onClose}
            title="Close dialog"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Task Title */}
            <div className="form-group">
              <label htmlFor="task-title-input" className="form-label">
                Task Title <span className="required-star">*</span>
              </label>
              <input
                id="task-title-input"
                type="text"
                className={`form-input ${errors.title ? 'has-error' : ''}`}
                placeholder="e.g. Build Login Page"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                autoFocus
              />
              {errors.title && (
                <div className="form-error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="task-desc-input" className="form-label">
                Description <span className="required-star">*</span>
              </label>
              <textarea
                id="task-desc-input"
                className={`form-textarea ${errors.description ? 'has-error' : ''}`}
                placeholder="Describe the scope, objectives, or acceptance criteria..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={() => handleBlur('description')}
                rows={3}
              />
              {errors.description && (
                <div className="form-error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            {/* Status & Priority Row */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="task-status-input" className="form-label">
                  Status
                </label>
                <select
                  id="task-status-input"
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="task-priority-input" className="form-label">
                  Priority <span className="required-star">*</span>
                </label>
                <select
                  id="task-priority-input"
                  className={`form-select ${errors.priority ? 'has-error' : ''}`}
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  onBlur={() => handleBlur('priority')}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && (
                  <div className="form-error-msg">
                    <AlertCircle size={14} />
                    <span>{errors.priority}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="task-duedate-input" className="form-label">
                Due Date <span className="required-star">*</span>
              </label>
              <input
                id="task-duedate-input"
                type="date"
                className={`form-input ${errors.dueDate ? 'has-error' : ''}`}
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                onBlur={() => handleBlur('dueDate')}
              />
              {errors.dueDate && (
                <div className="form-error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="submit-task-btn"
            >
              {isEditMode ? (
                <>
                  <Check size={16} />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
