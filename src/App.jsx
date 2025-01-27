import { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("all"); // all, active, completed

  // Додавання нового завдання
  const addTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
      };
      setTasks((prev) => [...prev, task]);
      setNewTask({ title: "", description: "" });
    }
  };

  // Видалення завдання
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Позначення завдання як виконаного
  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Фільтрація завдань
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Task Manager</h1>
        <p className="text-[#6B7280]">
          Організуйте свої завдання легко та зручно
        </p>
      </header>

      {/* Форма для додавання завдання */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1F2937]">
          Додати завдання
        </h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Назва завдання"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
          <textarea
            placeholder="Опис завдання"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
          <button
            onClick={addTask}
            className="w-full bg-[#3B82F6] text-white px-4 py-2 rounded hover:bg-[#2563EB] transition-colors"
          >
            Додати завдання
          </button>
        </div>
      </div>

      {/* Фільтрація завдань */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-[#1F2937]">Фільтрація</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 px-4 py-2 rounded ${
              filter === "all"
                ? "bg-[#3B82F6] text-white"
                : "bg-[#E5E7EB] text-[#1F2937]"
            } hover:bg-[#3B82F6] hover:text-white transition-colors`}
          >
            Всі
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`flex-1 px-4 py-2 rounded ${
              filter === "active"
                ? "bg-[#3B82F6] text-white"
                : "bg-[#E5E7EB] text-[#1F2937]"
            } hover:bg-[#3B82F6] hover:text-white transition-colors`}
          >
            Активні
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`flex-1 px-4 py-2 rounded ${
              filter === "completed"
                ? "bg-[#3B82F6] text-white"
                : "bg-[#E5E7EB] text-[#1F2937]"
            } hover:bg-[#3B82F6] hover:text-white transition-colors`}
          >
            Виконані
          </button>
        </div>
      </div>

      {/* Список завдань */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4 text-[#1F2937]">
          Список завдань
        </h2>
        {filteredTasks.length > 0 ? (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`p-4 border rounded-lg flex justify-between items-center ${
                  task.completed ? "bg-[#F3F4F6]" : "bg-white"
                }`}
              >
                <div>
                  <h3
                    className={`font-bold ${
                      task.completed
                        ? "text-[#6B7280] line-through"
                        : "text-[#1F2937]"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-[#6B7280]">{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`px-3 py-1 rounded ${
                      task.completed
                        ? "bg-[#10B981] text-white"
                        : "bg-[#E5E7EB] text-[#1F2937]"
                    } hover:bg-[#3B82F6] hover:text-white transition-colors`}
                  >
                    {task.completed ? "Активне" : "Виконане"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-[#EF4444] text-white rounded hover:bg-[#DC2626] transition-colors"
                  >
                    Видалити
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#6B7280]">Завдань немає.</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
