import React, { useState } from 'react';
import 'modern-css-reset';

import './App.css';
import logo from './logo.svg'
import Google from './Component/Google';
import Twitter from './Component/Twitter';

function App() {
  const [tmpWord, setTmpWord] = useState('');
  const [searchWord, setSearchWord] = useState('');

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo left" alt="logo" />
        <div className='center'>
          <input type='text' className='tmpword'
            value={tmpWord} onChange={(e)=>setTmpWord(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                setSearchWord(tmpWord)
              }
            }}
          ></input>
          <button  className='btn' onClick={() => setSearchWord(tmpWord)}>Search</button>
        </div>
        <img src={logo} className="App-logo right" alt="logo" />
      </header>
      <main>
        <Google searchWord={searchWord}></Google>
        {/* <Twitter searchWord={searchWord}></Twitter> */}
      </main>
      <footer></footer>
    </div>
  );
}




export default App;
