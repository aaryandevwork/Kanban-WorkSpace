import React from 'react';
import { useKanban } from './hooks/useKanban';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { ControlBar } from './components/ControlBar';
import { KanbanColumn } from './components/KanbanColumn';
import { TaskModal } from './components/TaskModal';

const COLUMNS = [
  { id: 'todo', label: 'To Do', dotColor: 'bg-amber-500' },
  { id: 'in-progress', label: 'In Progress', dotColor: 'bg-blue-500' },
  { id: 'completed', label: 'Completed', dotColor: 'bg-emerald-500' }
];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    tasks,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    editingTask,
    defaultModalStatus,
    openModal,
    closeModal,
    saveTask,
    deleteTask,
    moveTaskStatus
  } = useKanban();

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-zinc-200 transition-colors">
      <Header 
        onNewTask={() => openModal()} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <ControlBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.status === col.id)}
              onAddTask={(status) => openModal(null, status)}
              onEditTask={(task) => openModal(task)}
              onDeleteTask={deleteTask}
              onMoveTask={moveTaskStatus}
            />
          ))}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveTask}
        editingTask={editingTask}
        defaultStatus={defaultModalStatus}
      />
    </div>
  );
}