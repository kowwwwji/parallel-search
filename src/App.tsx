import React, { useState } from 'react';
import './App.css';

import Google from './Component/Google';


function App() {
  const [tmpWord, setTmpWord] = useState('');
  const [searchWord, setSearchWord] = useState('');

  return (
    <div className="App">
      <header>
        <textarea value={tmpWord} onChange={(e)=>setTmpWord(e.target.value)}></textarea>
        <button onClick={() => setSearchWord(tmpWord)}>Search</button>
      </header>
      <main>
        <Google searchWord={searchWord}></Google>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
