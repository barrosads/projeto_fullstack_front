import React from 'react';
import RoutesApp from './rotas/index';
import Header from '../src/pages/header';

export default function App() {
  return (
    <div className="App">

      <Header /> 
      <RoutesApp /> 
    </div>
  );
}
