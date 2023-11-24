import React, { useState } from "react";
import styled from "styled-components";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [popup, setPopup] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
      setPopup(false);
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed))
    );
  });

  return (
    <Main>
      <h1>Todo List</h1>
      <div className="top">
        <input
          className="search"
          type="text"
          placeholder="Search Notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          {["all", "active", "completed"].map((i) => (
            <option>{i}</option>
          ))}
        </select>
      </div>
      {popup && (
        <div className="popup">
          <div className="popUpChild">
            <h2>NEW NOTE</h2>
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="canAdd">
              <button onClick={() => setPopup(false)}>Cancel</button>
              <button onClick={addTodo}>Add Todo</button>
            </div>
          </div>
        </div>
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <div className="inLi">
              <input
                type="checkbox"
                onClick={() => toggleCompletion(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </div>
            <div className="inLi">
              <svg
                onClick={() =>
                  editTodo(todo.id, prompt("Edit todo:", todo.text))
                }
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"
                  stroke="#CDCDCD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                onClick={() => removeTodo(todo.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z"
                  stroke="#CDCDCD"
                />
                <path
                  d="M14.625 3.75H3.375"
                  stroke="#CDCDCD"
                  stroke-linecap="round"
                />
                <path
                  d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z"
                  stroke="#CDCDCD"
                />
                <path
                  d="M10.5 9V12.75"
                  stroke="#CDCDCD"
                  stroke-linecap="round"
                />
                <path
                  d="M7.5 9V12.75"
                  stroke="#CDCDCD"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
      <button className="addPop" onClick={() => setPopup(true)}>
        +
      </button>
    </Main>
  );
};

export default TodoApp;

const Main = styled.div`
  position: relative;
  display: flex;
  padding-top: 100px;
  gap: 30px;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;

  .search {
    width: 100%;
    height: 30px;
    border-color: #6c63ff;
    outline: none;
    border-width: 1px;
    border-radius: 5px;
  }

  .top {
    width: 600px;
    display: flex;
    gap: 8px;
  }
  .addPop {
    border-radius: 50%;
    font-size: 45px;
    padding: 0px 23px;
    background-color: #6c63ff;
    border: none;
    color: white;
    position: fixed;
    bottom: 20px;
    right: 35%;
  }
  .popup {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    position: 0, 0, 0, 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popUpChild {
    background-color: white;
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    gap: 70px;
    padding: 0px 24px;
    flex-direction: column;
    h2 {
      text-align: center;
    }
  }
  .canAdd {
    display: flex;
    justify-content: space-between;
  }

  ul {
    margin-top: 10px;
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  li {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid #6c63ff;
    padding-bottom: 8px;
  }

  .inLi {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  select {
    background-color: #6c63ff;
    color: white;
    border: 0;
    border-radius: 5px;
    outline: 0;
    padding-left: 5px;
  }
`;
