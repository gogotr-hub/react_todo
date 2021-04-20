import React, { useCallback, useState, useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  const [todos, setTodo] = useState([
    {
      id: 1,
      text: 'hello world!',
      checked: false,
    },
    {
      id: 2,
      text: 'hello world! 2',
      checked: false,
    },
  ]);

  const nextID = useRef(3);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextID.current,
        text,
        checked: false,
      };
      setTodo(todos.concat(todo));
      nextID.current += 1;
    },
    [todos],
  );

  const onToggle = useCallback(id =>{
    setTodo(todos.map(todo => todo.id === id ? {...todo, checked:!todo.checked} : todo))
  })

  const onRemove = useCallback(id =>{
    setTodo(todos.filter(todo => todo.id !== id))
  },[todos])

  return (
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}></TodoList>
      </TodoTemplate>
  );
};

export default App;
