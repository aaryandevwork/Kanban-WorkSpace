import React from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';

const PRIORITY_STYLES = {
  high: {
    backgroundColor: 'var(--badge-high-bg)',
    color: 'var(--badge-high-text)',
    borderColor: 'var(--badge-high-border)'
  },
  medium: {
    backgroundColor: 'var(--badge-medium-bg)',
    color: 'var(--badge-medium-text)',
    borderColor: 'var(--badge-medium-border)'
  },
  low: {
    backgroundColor: 'var(--badge-low-bg)',
    color: 'var(--badge-low-text)',
    borderColor: 'var(--badge-low-border)'
  }
};

export function TaskCard({ task, onEdit, onDelete, onMove }) {
  const badgeStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;

  return (
    <div 
      className="group p-4 rounded-xl border shadow-sm hover:shadow transition-all space-y-3"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border"
          style={badgeStyle}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 rounded transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            style={{ color: 'var(--text-secondary)' }}
            title="Edit task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-[11px] mt-1 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {task.description}
          </p>
        )}
      </div>

      <div className="pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
        <div className="flex items-center gap-1">
          {task.dueDate ? (
            <>
              <Calendar className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              <span>{task.dueDate}</span>
            </>
          ) : (
            <span className="italic" style={{ color: 'var(--text-muted)' }}>No date</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {task.status !== 'todo' && (
            <button
              onClick={() => onMove(task.status === 'completed' ? 'in-progress' : 'todo')}
              className="text-[10px] border px-1.5 py-0.5 rounded transition-colors"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              ← Back
            </button>
          )}

          {task.status !== 'completed' && (
            <button
              onClick={() => onMove(task.status === 'todo' ? 'in-progress' : 'completed')}
              className="text-[10px] border px-1.5 py-0.5 rounded transition-colors"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}