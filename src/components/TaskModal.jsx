import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = null
}) => {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

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
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: today
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    }
    if (!formData.priority) {
      errs.priority = 'Priority is required';
    }
    if (!formData.dueDate) {
      errs.dueDate = 'Due date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        id: initialData ? initialData.id : Date.now()
      });
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-field">
              <label className="form-label" htmlFor="title-input">
                Task Title <span className="req">*</span>
              </label>
              <input
                id="title-input"
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Build Login Page"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                autoFocus
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="desc-input">
                Description <span className="req">*</span>
              </label>
              <textarea
                id="desc-input"
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Brief description of the task..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="status-input">
                  Status
                </label>
                <select
                  id="status-input"
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="priority-input">
                  Priority <span className="req">*</span>
                </label>
                <select
                  id="priority-input"
                  className={`form-select ${errors.priority ? 'error' : ''}`}
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && <span className="form-error">{errors.priority}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="duedate-input">
                Due Date <span className="req">*</span>
              </label>
              <input
                id="duedate-input"
                type="date"
                className={`form-input ${errors.dueDate ? 'error' : ''}`}
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
              {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
            </div>
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
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
