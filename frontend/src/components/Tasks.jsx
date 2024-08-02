import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tasks = ({ tasks, addTask, updateTask}) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (event) => {
    event.preventDefault();
    // if (newTask.trim()) {
    //   addTask(newTask);
    //   setNewTask('');
    // }
  };

  const handleUpdateTask = (id, status) => {
    updateTask(id, status);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 border p-3">
          <h2 className="text-center">Todo</h2>
          <form onSubmit={handleAddTask} className="mb-4">
            <div className="input-group">
              <input 
                type="text" 
                value={newTask}
                className="form-control"
                placeholder="Add new task"
                onChange={({ target }) => setNewTask(target.value)}
              />
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
          <ul className="list-group">
            {tasks.filter(task => task.status === 'todo').map(task => (
              <li key={task.id} className="list-group-item">
                {task.content}
                <button 
                  className="btn btn-success btn-sm float-end"
                  onClick={() => handleUpdateTask(task.id, 'doing')}
                >Start</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-4 border p-3">
          <h2 className="text-center">Doing</h2>
          <ul className="list-group">
            {tasks.filter(task => task.status === 'doing').map(task => (
              <li key={task.id} className="list-group-item">
                {task.content}
                <button 
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => handleUpdateTask(task.id, 'done')}
                >Finish</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-4 border p-3">
          <h2 className="text-center">Done</h2>
          <ul className="list-group">
            {tasks.filter(task => task.status === 'done').map(task => (
              <li key={task.id} className="list-group-item">
                {task.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
