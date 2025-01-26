import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";

const App = () => {
  const [dailyTasks, setDailyTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [globalTasks, setGlobalTasks] = useState([
    {
      id: 1,
      title: "Project Launch",
      subtasks: ["Research", "Planning"],
      completed: [],
    },
  ]);
  const [newGlobalTask, setNewGlobalTask] = useState("");
  const [newSubtask, setNewSubtask] = useState("");

  const addDailyTask = () => {
    if (newTask.trim()) {
      setDailyTasks((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newTask],
      }));
      setNewTask("");
    }
  };

  const removeDailyTask = (index) => {
    setDailyTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks.splice(index, 1);
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  const addGlobalTask = () => {
    if (newGlobalTask.trim()) {
      setGlobalTasks((prev) => [
        ...prev,
        { id: Date.now(), title: newGlobalTask, subtasks: [], completed: [] },
      ]);
      setNewGlobalTask("");
    }
  };

  const removeGlobalTask = (taskId) => {
    setGlobalTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const addSubtask = (taskId) => {
    if (newSubtask.trim()) {
      setGlobalTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, subtasks: [...task.subtasks, newSubtask] }
            : task
        )
      );
      setNewSubtask("");
    }
  };

  const toggleSubtask = (taskId, subtask) => {
    setGlobalTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: task.completed.includes(subtask)
                ? task.completed.filter((t) => t !== subtask)
                : [...task.completed, subtask],
            }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen grid grid-rows-[1fr,2fr] bg-gray-100 p-4 md:grid-rows-1 md:grid-cols-2 gap-4">
      {/* Calendar & Daily Tasks */}
      <div className="grid grid-cols-2 gap-3">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-4 col-span-1">
          <h2 className="text-xl font-bold mb-4">Календар</h2>
          <div className="-scale-z-95 origin-top-left">
            <Calendar
              onChange={(date) => setSelectedDate(date.toDateString())}
              value={new Date(selectedDate)}
            />
          </div>
        </div>

        {/* Daily Tasks Section */}
        <div className="bg-white rounded-lg shadow p-4 col-span-1">
          <h2 className="text-xl font-bold mb-4">Щоденні завдання</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Додати завдання"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            <button
              onClick={addDailyTask}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Додати
            </button>
          </div>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {(dailyTasks[selectedDate] || []).map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded px-2 py-1"
              >
                <span>{task}</span>
                <button
                  onClick={() => removeDailyTask(index)}
                  className="text-red-500 hover:underline"
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Global Tasks */}
      <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Глобальні завдання</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Додати глобальне завдання"
            value={newGlobalTask}
            onChange={(e) => setNewGlobalTask(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <button
            onClick={addGlobalTask}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Додати
          </button>
        </div>
        <div className="space-y-4">
          {globalTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{task.title}</h3>
                <button
                  onClick={() => removeGlobalTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Видалити
                </button>
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Додати підзавдання"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
                <button
                  onClick={() => addSubtask(task.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Додати
                </button>
              </div>
              <ul className="space-y-1">
                {task.subtasks.map((subtask, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed.includes(subtask)}
                      onChange={() => toggleSubtask(task.id, subtask)}
                    />
                    <span>{subtask}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
