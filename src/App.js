import { useState, useEffect } from 'react';
import './App.scss';
import Modal from './components/Modal';
import StatusTodos from './components/Todos/StatusTodos/StatosTodos';
import TodoForm from './components/Todos/TodoForm/TodoForm';
import TodoList from './components/Todos/TodoList';
import { useSelector } from 'react-redux';
import { db } from './firebase';
import { query, collection, onSnapshot, addDoc } from 'firebase/firestore';
import ModalShow from './components/ModalShow';

function App() {
  const [todos, setTodos] = useState([]);
  const modalCard = useSelector((state) => state.todoSlice.modalCard);

  //Получаем список ту-ду с Firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Добавляем одну ту-ду и отправляем на Firebase
  const addTodoHandler = async (text, desc, data, file) => {
    if (!text) {
      alert('Please enter todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text,
      desc,
      data,
      file,
      isCompleted: false,
    });
  };

  // Функции по подсчету количества ту-ду и количеству выполненных туду
  const completedTodoHandler = () =>
    todos.filter((todo) => todo.isCompleted).length;
  const activeTodoHandler = () =>
    todos.filter((todo) => todo.isCompleted === false).length;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodoHandler} />
      <StatusTodos
        activeTodo={activeTodoHandler()}
        completedTodo={completedTodoHandler()}
      />
      {todos.length === 0 ? (
        <h2>Todo list is empty</h2>
      ) : (
        <TodoList todos={todos} />
      )}
      <Modal {...modalCard} />
      <ModalShow {...modalCard} />
    </div>
  );
}

export default App;
