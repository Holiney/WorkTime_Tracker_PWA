import { useState, useReducer, useEffect } from "react";

// Функція для отримання даних із localStorage
const getStoredTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Редуктор для керування списком задач
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text }];
    case "remove":
      return state.filter((task) => task.id !== action.id);
    case "load":
      return action.tasks; // Завантажуємо задачі при запуску
    default:
      return state;
  }
};

// Компонент окремої задачі
const Task = ({ task, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "5px 0",
      }}
    >
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>❌</button>
    </div>
  );
};

// Головний компонент
const TodoApp = () => {
  const [tasks, dispatch] = useReducer(reducer, [], getStoredTasks);
  const [input, setInput] = useState("");

  // Виконується при першому рендері → завантажує дані
  useEffect(() => {
    dispatch({ type: "load", tasks: getStoredTasks() });
  }, []);

  // Виконується при зміні tasks → зберігає у localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      dispatch({ type: "add", text: input });
      setInput("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "300px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>📌 To-Do List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введіть задачу..."
      />
      <button onClick={addTask}>Додати</button>

      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={(id) => dispatch({ type: "remove", id })}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
