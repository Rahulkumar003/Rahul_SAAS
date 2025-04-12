import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircle, Pencil, Trash2, GripVertical } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  quadrant: 'doFirst' | 'doLater' | 'delegate' | 'eliminate';
}

const quadrantConfig = {
  doFirst: {
    title: 'DO FIRST',
    bgColor: 'bg-emerald-500',
    borderColor: 'border-emerald-600',
    hoverColor: 'hover:bg-emerald-600',
    description: 'Urgent and important tasks that need immediate attention'
  },
  doLater: {
    title: 'DO LATER',
    bgColor: 'bg-blue-500',
    borderColor: 'border-blue-600',
    hoverColor: 'hover:bg-blue-600',
    description: 'Important but not urgent tasks to be scheduled'
  },
  delegate: {
    title: 'DELEGATE',
    bgColor: 'bg-amber-500',
    borderColor: 'border-amber-600',
    hoverColor: 'hover:bg-amber-600',
    description: 'Urgent but not important tasks to assign to others'
  },
  eliminate: {
    title: 'ELIMINATE',
    bgColor: 'bg-red-500',
    borderColor: 'border-red-600',
    hoverColor: 'hover:bg-red-600',
    description: 'Neither urgent nor important tasks to reconsider'
  }
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<Task['quadrant']>('doFirst');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([...tasks, { 
      id: Date.now().toString(), 
      content: newTask,
      quadrant: selectedQuadrant
    }]);
    setNewTask('');
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingContent(task.content);
  };

  const saveEdit = (id: string) => {
    if (!editingContent.trim()) {
      deleteTask(id);
      return;
    }
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, content: editingContent } : task
    ));
    setEditingId(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent, task: Task) => {
    if (e.key === 'Enter') {
      startEditing(task);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteTask(task.id);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    const taskList = Array.from(tasks);
    const [movedTask] = taskList.splice(source.index, 1);
    
    movedTask.quadrant = destination.droppableId as Task['quadrant'];
    
    const sourceQuadrantTasks = taskList.filter(task => task.quadrant === source.droppableId);
    const destQuadrantTasks = taskList.filter(task => task.quadrant === destination.droppableId);
    
    const remainingTasks = taskList.filter(
      task => task.quadrant !== source.droppableId && task.quadrant !== destination.droppableId
    );
    
    destQuadrantTasks.splice(destination.index, 0, movedTask);
    
    const newTasks = [
      ...remainingTasks,
      ...sourceQuadrantTasks,
      ...destQuadrantTasks
    ];
    
    setTasks(newTasks);
  };

  const getTasksByQuadrant = (quadrant: Task['quadrant']) => {
    return tasks.filter(task => task.quadrant === quadrant);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Supertasks.io
          </h1>
          <p className="text-gray-400 text-lg text-center">
            Organize your tasks 
          </p>
        </header>

        <form onSubmit={addTask} className="mb-8 flex gap-2 max-w-2xl mx-auto">
          <div className="flex-1">
            <label htmlFor="newTask" className="sr-only">New task</label>
            <input
              id="newTask"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-label="New task input"
            />
          </div>
          <div>
            <label htmlFor="quadrant" className="sr-only">Select quadrant</label>
            <select
              id="quadrant"
              value={selectedQuadrant}
              onChange={(e) => setSelectedQuadrant(e.target.value as Task['quadrant'])}
              className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-label="Select task quadrant"
            >
              {Object.entries(quadrantConfig).map(([key, value]) => (
                <option key={key} value={key}>{value.title}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Add task"
          >
            <PlusCircle size={20} />
            <span>Add</span>
          </button>
        </form>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(quadrantConfig).map(([quadrantKey, quadrantValue]) => (
              <div key={quadrantKey} className="bg-gray-800 rounded-lg p-4">
                <div className="mb-4">
                  <h2 className={`text-lg font-bold text-white text-center py-2 rounded ${quadrantValue.bgColor}`}>
                    {quadrantValue.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    {quadrantValue.description}
                  </p>
                </div>
                <Droppable droppableId={quadrantKey}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-3 min-h-[200px] rounded-lg p-2 transition-colors ${
                        snapshot.isDraggingOver ? 'bg-gray-700 bg-opacity-50' : ''
                      }`}
                    >
                      {getTasksByQuadrant(quadrantKey as Task['quadrant']).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`${quadrantValue.bgColor} bg-opacity-10 border ${
                                quadrantValue.borderColor
                              } border-opacity-25 rounded-lg p-3 flex items-center gap-3 group ${
                                snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
                              } hover:bg-opacity-20 transition-all focus-within:ring-2 focus-within:ring-blue-500`}
                              role="listitem"
                              tabIndex={0}
                              onKeyDown={(e) => handleKeyPress(e, task)}
                              aria-label={`Task: ${task.content}. Press Enter to edit, Delete to remove`}
                            >
                              <div 
                                {...provided.dragHandleProps} 
                                className="text-gray-400 hover:text-gray-300"
                                aria-label="Drag handle"
                              >
                                <GripVertical size={20} />
                              </div>
                              
                              {editingId === task.id ? (
                                <input
                                  type="text"
                                  value={editingContent}
                                  onChange={(e) => setEditingContent(e.target.value)}
                                  onBlur={() => saveEdit(task.id)}
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                                  className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                                  autoFocus
                                  aria-label="Edit task"
                                />
                              ) : (
                                <span className="flex-1 text-white">{task.content}</span>
                              )}
                              
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEditing(task)}
                                  className="text-blue-400 hover:text-blue-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  aria-label="Edit task"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button
                                  onClick={() => deleteTask(task.id)}
                                  className="text-red-400 hover:text-red-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                  aria-label="Delete task"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;