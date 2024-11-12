/*import React from "react";

function TodoItem({ item, deleteItem }) {
  return (
    <div className="flex justify-between items-center bg-pastel-blue rounded-md px-3 py-2 shadow-sm hover:shadow-md text-sm">
      <span className="text-gray-800 truncate">{item.text}</span>
      <button
        className="text-black bg-transparent hover:bg-slate-200 rounded-full p-1 transition-colors text-xs"
        onClick={() => deleteItem(item.id)}
      >
        X
      </button>
    </div>
  );
}

export default TodoItem;*/

import React from "react";

function TodoItem({ item, deleteItem, toggleComplete }) {
  return (
    <div className={`flex justify-between items-center bg-pastel-blue rounded-md px-3 py-2 shadow-sm hover:shadow-md text-sm ${item.isCompleted ? 'bg-green-100' : ''}`}>
      <span className={`text-gray-800 truncate ${item.isCompleted ? 'line-through' : ''}`}>{item.text}</span>
      <div>
        <button
          className="text-black bg-transparent hover:bg-gray-400 p-1 transition-colors text-xs mr-2"
          onClick={() => toggleComplete(item.id)}
        >
          {item.isCompleted ? '취소' : '완료'}
        </button>
        <button
          className="text-black bg-transparent hover:bg-slate-200 rounded-full p-1 transition-colors text-xs"
          onClick={() => deleteItem(item.id)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

