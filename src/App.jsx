import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";

const App = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [globalTasks, setGlobalTasks] = useState([
    {
      id: 1,
      title: "Project Launch",
      subtasks: ["Research", "Planning", "Execution"],
      completed: [],
    },
  ]);

  const addDailyTask = () => {
    if (newTask.trim()) {
      setDailyTasks([...dailyTasks, newTask]);
      setNewTask("");
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
    <div className="h-screen grid grid-rows-[1fr,2fr] bg-gray-100 p-4">
      {/* Top Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Календар</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

        {/* Daily Tasks Section */}
        <div className="bg-white rounded-lg shadow p-4">
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
          <ul className="space-y-2">
            {dailyTasks.map((task, index) => (
              <li key={index} className="border rounded px-2 py-1">
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Глобальні завдання</h2>
        <div className="space-y-4">
          {globalTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">{task.title}</h3>
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
