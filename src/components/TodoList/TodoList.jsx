import React, { useState } from "react";
import "./TodoList.css";

export default function TodoList({ items }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Work Item List</h2>

      <ul className="todo-list">
        {items.map((todo) => {
          const isExpanded = expandedIds.includes(todo.id);
          return (
            <li
              key={todo.id}
              className={`todo-item ${todo.done ? "done" : ""}`}
            >
              <span className="dot" />
              <div className="todo-content">
                <div className="todo-header">
                  <span className="todo-text">{todo.text}</span>

                  {todo.description && (
                    <button
                      className="expand-btn"
                      onClick={() => toggleExpand(todo.id)}
                    >
                      {isExpanded ? "Hide" : "Show"}
                    </button>
                  )}
                </div>

                {todo.description && isExpanded && (
                  <p className="todo-description">{todo.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
