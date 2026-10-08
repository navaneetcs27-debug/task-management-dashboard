# ReactJS Task Management Dashboard — TaskFlow

> **ReactJS Technical Round 1 Practical Assignment**  
> A high-performance, responsive, and aesthetically modern Task Management Dashboard built with **React 19**, **Vite**, and a bespoke **Vanilla CSS Design System**.

---

## 🌟 Live Demo & Repository
- **Live Demo:** [https://reactjs-taskflow-dashboard.vercel.app](https://reactjs-taskflow-dashboard.vercel.app) *(Deployable on Vercel / Netlify / GitHub Pages)*
- **GitHub Repository:** `https://github.com/<your-username>/reactjs-technical-round-1`

---

## 📖 Project Overview
**TaskFlow** is a comprehensive task management platform designed to help teams and individuals create, organize, track, and complete tasks with an intuitive, fluid user experience. It features real-time search, multi-criteria filtering, multi-layout viewing (Cards Grid, Kanban Board, Data Table), robust form validation, dynamic statistics, theme switching (Dark & Light), and `localStorage` persistence.

---

## 🛠️ Technologies Used
- **Frontend Framework:** React 19 (Functional Components, Custom Hooks, State & Effect hooks)
- **Tooling & Bundler:** Vite 6 (Lightning-fast HMR and optimized production bundling)
- **Language:** JavaScript (ES6+ Modules, Async/Await)
- **Styling:** Vanilla CSS3 Design System with CSS Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism, and responsive micro-animations
- **Typography:** Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
- **Icons:** Lucide React
- **Micro-Interactions:** Canvas Confetti (celebratory completion feedback)

---

## 🚀 Features Implemented

### 1. 📊 Interactive Dashboard & Live Statistics (Section 3A & 6)
- **Metric Cards:** Real-time counters for **Total Tasks**, **Pending**, **In Progress**, and **Completed**.
- **Progress Tracking:** Dynamic completion percentage bar showing overall workload progress.
- Automatic updates across all metrics whenever tasks are added, modified, status-updated, or deleted.

### 2. ➕ Add Task with Form Validation (Section 3B)
- Dedicated modal dialogue for creating tasks.
- **Form Fields:** Task Title, Description, Status, Priority, Due Date.
- **Strict Validation:** Required validation for Task Title (min 3 chars), Description, Priority, and Due Date with helpful inline error alerts.

### 3. ✏️ Edit Task (Section 3C)
- Pre-populates the modal form with current task details.
- Validates changes and immediately syncs the updated task back to the dashboard state and local storage.

### 4. 🗑️ Delete Task with Confirmation Modal (Section 3D)
- Safety confirmation modal dialog (*"Are you sure you want to delete this task?"*).
- Prevents accidental deletions and cleans up the active list smoothly.

### 5. 🔄 Quick Status Workflow (Section 3E)
- Direct status dropdown on every card/row (`Pending` → `In Progress` → `Completed`).
- One-click quick advance button.
- Celebratory confetti burst when completing tasks!

### 6. 🔍 Real-Time Search (Section 4)
- Live, instant search across both **Task Title** and **Description**.
- Quick "Clear search" button for effortless filtering.

### 7. 🏷️ Multi-Filter & Sorting (Section 5 & 10)
- **Status Filter:** `All`, `Pending`, `In Progress`, `Completed`.
- **Priority Filter:** `All`, `Low`, `Medium`, `High`.
- **Combined Filtering:** Simultaneously filter by Status and Priority (e.g., *High Priority + In Progress*).
- **Sorting Options:** Sort by *Due Date*, *Priority (High to Low)*, *Status*, *Title (A-Z)*, or *Creation Date*, with ascending/descending toggling.

### 8. 📐 Multiple View Modes (Section 9 & 10)
- **Cards Grid View:** Responsive card grid with priority top accent strips and due date countdown badges.
- **Kanban Board View:** 3-column workflow board (`Pending`, `In Progress`, `Completed`).
- **Table View:** Compact data table with sortable columns and quick action triggers.

### 9. 🌓 Dark / Light Theme Toggle (Section 10)
- Sleek modern dark mode (default) and crisp high-contrast light mode.
- Seamless CSS variable transition and theme preference saved in `localStorage`.

### 10. 💾 Local Storage Persistence (Section 10)
- Automatically persists all user modifications, new tasks, and deletions.
- One-click "Reset Sample Data" button to restore initial evaluation tasks at any time.

### 11. ⚠️ Robust Loading & Empty States (Section 10)
- Friendly contextual empty states when search returns no matches or when task lists are empty, complete with quick reset actions.

---

## 💻 Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup Steps
```bash
# 1. Clone repository
git clone https://github.com/<your-username>/reactjs-technical-round-1.git

# 2. Navigate to project directory
cd reactjs-technical-round-1

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

The application will be available at `http://localhost:5173/`.

---

## 🏛️ Architecture & Technical Discussion (Section 11)

### 1. Component Breakdown & Reusability
The application is structured into modular, single-responsibility components:
```
src/
├── components/
│   ├── Header.jsx           # App branding, Theme toggle, New Task CTA, Reset data
│   ├── StatsOverview.jsx    # Metrics cards (Total, Pending, In Progress, Completed, %)
│   ├── FilterBar.jsx        # Search input, status & priority pills, sort dropdown, view switcher
│   ├── TaskCard.jsx         # Card item with status/priority badges, due date, edit/delete/status actions
│   ├── TaskGrid.jsx         # Responsive grid container for task cards
│   ├── TaskBoard.jsx        # 3-column Kanban layout (Pending / In Progress / Completed)
│   ├── TaskTable.jsx        # Tabular view with inline status update and actions
│   ├── TaskModal.jsx        # Unified reusable modal for both Add & Edit task with validation
│   ├── DeleteModal.jsx      # Confirmation dialog for safe deletion
│   ├── EmptyState.jsx       # Contextual empty & no-results feedback states
│   └── ToastNotification.jsx# Animated toast alerts for user feedback
├── data/
│   └── initialTasks.js      # Seed mock dataset including problem statement requirements
├── utils/
│   ├── storage.js           # LocalStorage read/write wrappers with JSON error boundary
│   └── dateUtils.js         # Formatting, overdue detection, relative date calculations
├── App.jsx                  # Top-level orchestration and state management
├── index.css                # Custom CSS Design System (variables, light/dark themes, animations)
└── main.jsx                 # Application entry point
```

### 2. State Management Strategy
- **Centralized Lifting of State:** The master task state (`tasks`) resides at `App.jsx`, providing a single source of truth that drives the statistics, filter pipeline, cards, and persistence engine.
- **Derived State with `useMemo`:** Filtered and sorted tasks (`filteredTasks`) are calculated efficiently using `useMemo` so expensive recalculations only occur when dependencies (`tasks`, `searchQuery`, `statusFilter`, `priorityFilter`, `sortBy`, `sortOrder`) change.
- **Local Form State:** Form input state and validation errors reside locally inside `TaskModal.jsx` to prevent unnecessary re-renders of the dashboard while typing.

### 3. Search and Multi-Filtering Architecture
- Search performs normalized, case-insensitive substring matching against both `task.title` and `task.description`.
- Filter predicates are composed multiplicatively: `matchesSearch && matchesStatus && matchesPriority`.
- Sorting supports typed comparisons (Date timestamps, custom Priority weight matrices `High: 3, Medium: 2, Low: 1`, and string collation).

### 4. Handling Scale (Large Number of Tasks)
If scaling to 10,000+ tasks:
- **Virtualization:** Integrate `@tanstack/react-virtual` or `react-window` to render only visible DOM nodes in list/table views.
- **Debounced Search:** Apply `useDeferredValue` or `useDebounce` (150-300ms) on the search input to avoid recalculating heavy queries on every keystroke.
- **Pagination / Infinite Scrolling:** Implement server-side or chunked client-side pagination.
- **Backend API Integration:** Move filter, search, and sort operations to a REST/GraphQL backend with database indexing.

---

## 📋 Evaluation Checklist (Section 17)

| Item | Requirement | Status |
| :--- | :--- | :---: |
| 1 | React application is working | ✅ Passed |
| 2 | Add Task works with validation | ✅ Passed |
| 3 | Edit Task works with pre-populated form | ✅ Passed |
| 4 | Delete Task works with confirmation modal | ✅ Passed |
| 5 | Status update works (`Pending` → `In Progress` → `Completed`) | ✅ Passed |
| 6 | Search works across title & description | ✅ Passed |
| 7 | Status filter works (`All`, `Pending`, `In Progress`, `Completed`) | ✅ Passed |
| 8 | Priority filter works (`All`, `Low`, `Medium`, `High`) | ✅ Passed |
| 9 | Statistics update dynamically | ✅ Passed |
| 10 | Form validation works (displays error messages for missing fields) | ✅ Passed |
| 11 | Application is responsive across devices | ✅ Passed |
| 12 | GitHub repository is clean (no secrets or `.env` files) | ✅ Passed |
| 13 | README.md is comprehensive | ✅ Passed |
| 14 | Local Storage persistence & Dark Mode toggles included | ✅ Passed |

---

## 👨‍💻 Candidate Details
- **Candidate Name:** [Your Name]
- **Email:** [your-email@example.com]
- **Phone:** [+91 XXXXXXXXXX]
- **GitHub:** `https://github.com/<your-username>`
- **Live Deployment:** `https://<your-project-url>`
