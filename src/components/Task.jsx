import React, { useEffect, useState } from "react";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all tasks
const fetchTasks = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    // If backend returns { success, tasks: [...] }
    if (Array.isArray(data)) {
      setTasks(data);
    } else if (data.tasks && Array.isArray(data.tasks)) {
      setTasks(data.tasks);
    } else {
      setTasks([]); // fallback
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    setTasks([]);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Update task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${editingTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, completed: editingTask.completed }),
      });
      if (res.ok) {
        setEditingTask(null);
        setTitle("");
        setDescription("");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📝 Task Manager</h2>

      {/* Task Form */}
      <form
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        className="mb-6 flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center border p-3 rounded shadow-sm"
          >
            <div>
              <h3 className={`font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.title}
              </h3>
              <p className="text-gray-600">{task.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingTask(task);
                  setTitle(task.title);
                  setDescription(task.description);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p className="text-gray-500 text-center mt-4">No tasks yet.</p>}
    </div>
  );
}

export default Task;
