# Task Management Application

A modern task management application built with React and TypeScript that implements the Eisenhower Matrix for better task prioritization. The application features a beautiful, accessible interface with drag-and-drop capabilities for easy task organization.


## Features

- ✨ Beautiful, modern interface
- 🎯 Eisenhower Matrix implementation
- 🖱️ Drag and drop task organization
- ⌨️ Full keyboard navigation support
- 📱 Responsive design
- ♿ Accessibility features
- 🎨 Color-coded task categories

## Task Categories

1. **Do First** (Urgent & Important)
   - Tasks that need immediate attention
   - High priority items
   - Critical deadlines

2. **Do Later** (Important, Not Urgent)
   - Strategic planning
   - Personal development
   - Long-term projects

3. **Delegate** (Urgent, Not Important)
   - Tasks that can be assigned to others
   - Interruptions
   - Some meetings and calls

4. **Eliminate** (Not Urgent, Not Important)
   - Time-wasting activities
   - Distractions
   - Low-value tasks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd task-management-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Usage

1. **Adding Tasks**
   - Type your task in the input field
   - Select the appropriate quadrant
   - Click "Add" or press Enter

2. **Managing Tasks**
   - Drag and drop tasks between quadrants
   - Click the edit icon to modify tasks
   - Click the delete icon to remove tasks
   - Use keyboard navigation (Tab, Enter, Delete)

3. **Keyboard Shortcuts**
   - Enter: Edit selected task
   - Delete/Backspace: Remove selected task
   - Tab: Navigate between tasks
   - Space: Select/deselect task for dragging

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- @hello-pangea/dnd (Drag and Drop)
- Lucide React (Icons)


## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
task-management-app/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Eisenhower Matrix concept
- React and TypeScript communities
- Contributors and maintainers of used libraries
