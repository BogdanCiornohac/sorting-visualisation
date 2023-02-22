import React from 'react';
import Header from './components/header/Header';
import SortingTable from './components/sortingtable/SortingTable';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <SortingTable />
      </div>
      <div className='spacer layer1'></div>
    </>
  );
}

export default App;
