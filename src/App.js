import React, { useCallback, useState, useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos(){
  const array = []
  for(let i=1; i<=2000; i++){
    array.push({
      id:i,
      text: `할일 ${i}`,
      checked: false
    })
  }
  return array
}

const App = () => {
  const [todos, setTodo] = useState(createBulkTodos);

  const nextID = useRef(2001);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextID.current,
        text,
        checked: false,
      };
      setTodo(todos => todos.concat(todo));
      nextID.current += 1;
    },
    [],
  );

  const onToggle = useCallback(id =>{
    setTodo(todos => todos.map(todo => todo.id === id ? {...todo, checked:!todo.checked} : todo))
  },[])

  const onRemove = useCallback(id =>{
    setTodo(todos => todos.filter(todo => todo.id !== id))
  },[])

  return (
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}></TodoList>
      </TodoTemplate>
  );
};

export default App;
