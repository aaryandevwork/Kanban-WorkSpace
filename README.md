# Kanban Workspace 🚀

> A clean, minimal, and lightning-fast personal Kanban task management
> dashboard built with React, Tailwind CSS, and custom CSS variables.
> Designed for clarity, focus, and seamless daily productivity.

![React](https://img.shields.io/badge/React-18+-black?style=flat-square&logo=react)
![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-v3+-38BDF8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

------------------------------------------------------------------------

## ✨ Features

-   **Modular Architecture:** Built following senior-level React
    patterns with decoupled custom hooks (`useKanban`, `useTheme`) and
    pure component segregation.
-   **Dynamic Kanban Columns:** Manage tasks smoothly across **To Do**,
    **In Progress**, and **Completed** stages with quick-shift controls.
-   **Advanced Filtering & Search:** Instantly filter tasks by priority
    (`High`, `Medium`, `Low`), status, or search keywords in real time.
-   **Dark & Light Mode Support:** Fully integrated theme switcher
    powered by centralized CSS design tokens (`:root` and `.dark`
    variables).
-   **Persistent Local Storage:** Automatically syncs board updates and
    theme preferences locally so your data survives page refreshes.
-   **Tactile Micro-Interactions:** Clean, minimalist UI inspired by
    modern design standards such as Linear and Notion, with zero visual
    clutter.

------------------------------------------------------------------------

## 🛠️ Project Structure

``` text
src/
├── components/
│   ├── ControlBar.jsx     # Search inputs & priority/status filters
│   ├── Header.jsx         # App branding, new task trigger & theme toggle
│   ├── KanbanColumn.jsx  # Individual board status columns & counters
│   ├── TaskCard.jsx       # Individual task items with metadata & actions
│   └── TaskModal.jsx      # Create/Edit modal dialog with validation
├── hooks/
│   ├── useKanban.js       # Core state management, CRUD logic & localStorage sync
│   └── useTheme.js        # Theme state handler and DOM class toggler
├── index.css              # Centralized CSS variables & design tokens
└── App.jsx                # Root application coordinator
```

------------------------------------------------------------------------

## 🚀 Getting Started Locally

Follow these instructions to get a copy of the project up and running on
your local machine for development and testing.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your
system.

### Installation

1.  **Clone the repository:**

    ``` bash
    git clone https://github.com/aaryandevwork/kanban-workspace.git
    ```

2.  **Navigate to the project directory:**

    ``` bash
    cd kanban-workspace
    ```

3.  **Install dependencies:**

    ``` bash
    npm install
    ```

4.  **Run the development server:**

    ``` bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` (or the
    port specified in your terminal).

------------------------------------------------------------------------

## 📦 Tech Stack

-   **Core Library:** React 18
-   **Styling:** Tailwind CSS & custom CSS variables (`var(--...)`)
-   **Icons:** Lucide React
-   **Persistence:** Browser `localStorage` API

------------------------------------------------------------------------

## 📄 License

Distributed under the [MIT
License](https://opensource.org/licenses/MIT). Feel free to use and
modify this project for personal or commercial purposes.
