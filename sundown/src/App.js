import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    let getName = localStorage.getItem('name');
    console.log(getName);
  }, [name])

  const saveName = () => {
    alert('Name set');
    localStorage.setItem('name', name);
  }

  return (
    <div className="App">
      <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)}/>
      <input onClick={saveName} type="submit" value="set name"/>
    </div>
  );
}

export default App;
