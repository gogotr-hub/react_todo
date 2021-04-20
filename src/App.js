import React from 'react';
import TodoInsert from './components/TodoInsert';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  return (
    <form>
      <TodoTemplate>
        <TodoInsert></TodoInsert>
        
      </TodoTemplate>
    </form>
  );
};

export default App;