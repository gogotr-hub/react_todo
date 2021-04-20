import React, { useCallback, useState, useRef, useReducer } from 'react';
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

function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo => todo.id === action.id 
        ? {...todos, checked: !todo.checked}
        : todo
        )
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextID = useRef(2001);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextID.current,
        text,
        checked: false,
      };
      dispatch({type:'INSERT', todo})
      nextID.current += 1;
    },
    [],
  );

  const onToggle = useCallback(id =>{
    dispatch({type:'TOGGLE', id})
  },[])

  const onRemove = useCallback(id =>{
    dispatch({type:'REMOVE', id})
  },[])

  return (
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}></TodoList>
      </TodoTemplate>
  );
};

export default App;
