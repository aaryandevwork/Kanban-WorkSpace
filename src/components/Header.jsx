import React from 'react';
import { Plus, Sun, Moon } from 'lucide-react';

export function Header({ onNewTask, theme, onToggleTheme }) {
  return (
    <header 
      className="sticky top-0 z-30 backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: 'var(--bg-app)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm tracking-tight shadow-sm"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)'
            }}
          >
            K
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Kanban Workspace
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Personal Task Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Switch */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border transition-colors hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onNewTask()}
            className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-md shadow-sm transition-all focus:outline-none"
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)'
            }}
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}