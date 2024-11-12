import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoBoard from './component/TodoBoard.jsx';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todolist, setTodolist] = useState([]);
  const url = ('http://localhost:8080/todos')
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(url);
      const todos = Array.isArray(response.data) ? response.data : [];
      setTodolist(todos);
    } catch (error) {
      setTodolist([]); 
    }
  };
  
  const addItem = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post(url, { content: inputValue });
        setTodolist([...todolist, response.data]);
        setInputValue('');
      } catch (error) {
        console.error('할 일을 추가하는 데 실패했습니다:', error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      setTodolist(todolist.filter((item) => item.id !== id));
    } catch (error) {
      console.error('할 일을 삭제하는 데 실패했습니다:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todolist.find(item => item.id === id);
      const response = await axios.put(`http://localhost:8080/todos/${id}`, {
        ...todoToUpdate,
        isComplete: !todoToUpdate.isComplete
      });
      setTodolist(todolist.map((item) => 
        item.id === id ? response.data : item
      ));
    } catch (error) {
      console.error('할 일 완료 상태를 변경하는 데 실패했습니다:', error);
    }
  };
   
  return (
    <div className="bg-neutral-50 rounded-lg p-8 shadow-md ">
      <h1 className="font-mono text-center text-3xl mb-6 text-gray-700 shadow-md rounded-full">TODO LIST</h1>
      <div className="flex mb-6">
        <input
          className="text-gray-800 placeholder-gray-500 text-center rounded-lg px-4 py-2 mr-2 shadow-sm focus:outline-none"
          value={inputValue}
          type="text"
          placeholder="해야할 일을 입력하세요"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          className="bg-slate-50 text-black rounded-lg px-4 py-2 hover:bg-slate-200 shadow-md hover:shadow-sm"
          onClick={addItem}
        >
          추가
        </button>
      </div>
      <TodoBoard 
        todolist={todolist} 
        deleteItem={deleteItem} 
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
