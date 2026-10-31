import { useState, useEffect, useMemo } from 'react';

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Design System Tokens',
    description: 'Define color variables, semantic spacing rules, and standard typography scale.',
    priority: 'high',
    status: 'todo',
    dueDate: '2026-11-05'
  },
  {
    id: 'task-2',
    title: 'Refactor Authentication Logic',
    description: 'Migrate token refresh flow to silent background handling with safe fallbacks.',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-11-02'
  },
  {
    id: 'task-3',
    title: 'Setup Vitest Unit Suite',
    description: 'Configure test runner for core UI state helper functions and storage sync.',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-10-28'
  }
];

const STORAGE_KEY = 'kanban_tasks_app';

export function useKanban() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
      return INITIAL_TASKS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultModalStatus, setDefaultModalStatus] = useState('todo');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const openModal = (task = null, defaultStatus = 'todo') => {
    setEditingTask(task);
    setDefaultModalStatus(defaultStatus);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const saveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        ...taskData
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    closeModal();
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTaskStatus = (id, nextStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, priorityFilter, statusFilter]);

  return {
    tasks: filteredTasks,
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
  };
}