import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Calendar,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trash2,
  Edit2,
  X,
  Check,
  ChevronDown
} from "lucide-react";

// Initial mock state if localStorage is empty
const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Design System Tokens",
    description: "Define color variables, semantic spacing rules, and standard typography scale.",
    priority: "high",
    status: "todo",
    dueDate: "2026-11-05"
  },
  {
    id: "task-2",
    title: "Refactor Authentication Logic",
    description: "Migrate token refresh flow to silent background handling with safe fallbacks.",
    priority: "medium",
    status: "in-progress",
    dueDate: "2026-11-02"
  },
  {
    id: "task-3",
    title: "Setup Vitest Unit Suite",
    description: "Configure test runner for core UI state helper functions and storage sync.",
    priority: "low",
    status: "completed",
    dueDate: "2026-10-28"
  }
];

const COLUMNS = [
  { id: "todo", label: "To Do", dotColor: "bg-amber-500" },
  { id: "in-progress", label: "In Progress", dotColor: "bg-blue-500" },
  { id: "completed", label: "Completed", dotColor: "bg-emerald-500" }
];

export default function KanbanBoard() {
  // State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban_tasks_app");
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem("kanban_tasks_app", JSON.stringify(tasks));
  }, [tasks]);

  // Open modal for Create/Edit
  const openModal = (task = null, defaultStatus = "todo") => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate || ""
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: defaultStatus,
        dueDate: ""
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Form handling & validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t))
      );
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        ...formData
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

  // Filtered tasks calculation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, priorityFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans antialiased selection:bg-zinc-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
              K
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
                Kanban Workspace
              </h1>
              <p className="text-xs text-zinc-500">Personal Task Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-3.5 py-2 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Controls Bar: Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3 rounded-xl border border-zinc-200 shadow-sm">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-36">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all pr-8 cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>

            <div className="relative flex-1 sm:w-36">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all pr-8 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === col.id
            );

            return (
              <div
                key={col.id}
                className="bg-zinc-100/60 rounded-xl border border-zinc-200/70 p-4 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${col.dotColor}`}
                    />
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      {col.label}
                    </h2>
                    <span className="text-[11px] font-medium text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>

                  <button
                    onClick={() => openModal(null, col.id)}
                    className="p-1 text-zinc-400 hover:text-zinc-700 rounded-md hover:bg-zinc-200/60 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Task Cards List */}
                <div className="space-y-3 flex-1">
                  {columnTasks.length > 0 ? (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => openModal(task)}
                        onDelete={() => deleteTask(task.id)}
                        onMove={(nextStatus) =>
                          moveTaskStatus(task.id, nextStatus)
                        }
                      />
                    ))
                  ) : (
                    <div className="h-40 border border-dashed border-zinc-300 rounded-lg flex flex-col items-center justify-center text-center p-4">
                      <p className="text-xs font-medium text-zinc-500">
                        No tasks here
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Click '+' to add a task to {col.label.toLowerCase()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Task Modal (Create / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h3>
              <button
                onClick={closeModal}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Implement user registration"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full px-3 py-2 bg-zinc-50 border ${
                    errors.title ? "border-rose-500" : "border-zinc-200"
                  } rounded-lg text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all`}
                />
                {errors.title && (
                  <p className="text-[11px] text-rose-500 mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Add details about this task..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Priority & Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-sm transition-all"
                >
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Single Task Card Component
function TaskCard({ task, onEdit, onDelete, onMove }) {
  const priorityBadgeStyle = {
    high: "bg-rose-50 text-rose-700 border-rose-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-zinc-100 text-zinc-600 border-zinc-200"
  };

  return (
    <div className="group bg-white p-4 rounded-xl border border-zinc-200/90 shadow-sm hover:shadow transition-all space-y-3">
      {/* Top Details & Priority */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${
            priorityBadgeStyle[task.priority] || priorityBadgeStyle.low
          }`}
        >
          {task.priority}
        </span>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-900 leading-snug">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer: Move state buttons & due date */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <div className="flex items-center gap-1">
          {task.dueDate ? (
            <>
              <Calendar className="w-3 h-3 text-zinc-400" />
              <span>{task.dueDate}</span>
            </>
          ) : (
            <span className="italic text-zinc-300">No date</span>
          )}
        </div>

        {/* Quick Move Action Buttons */}
        <div className="flex items-center gap-1">
          {task.status !== "todo" && (
            <button
              onClick={() =>
                onMove(task.status === "completed" ? "in-progress" : "todo")
              }
              className="text-[10px] text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded transition-colors"
              title="Move left"
            >
              ← Back
            </button>
          )}

          {task.status !== "completed" && (
            <button
              onClick={() =>
                onMove(task.status === "todo" ? "in-progress" : "completed")
              }
              className="text-[10px] text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded transition-colors"
              title="Move right"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}