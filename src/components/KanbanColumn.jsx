import React from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';

export function KanbanColumn({ column, tasks, onAddTask, onEditTask, onDeleteTask, onMoveTask }) {
  return (
    <div className="bg-zinc-100/60 rounded-xl border border-zinc-200/70 p-4 flex flex-col min-h-[500px]">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dotColor}`} />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
            {column.label}
          </h2>
          <span className="text-[11px] font-medium text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 text-zinc-400 hover:text-zinc-700 rounded-md hover:bg-zinc-200/60 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              onMove={(nextStatus) => onMoveTask(task.id, nextStatus)}
            />
          ))
        ) : (
          <div className="h-40 border border-dashed border-zinc-300 rounded-lg flex flex-col items-center justify-center text-center p-4">
            <p className="text-xs font-medium text-zinc-500">No tasks here</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Click '+' to add a task to {column.label.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}