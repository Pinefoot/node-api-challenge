import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'




function App() {
  const [projData, setProjData] = useState([]);

  useEffect(()=>{
    axios.get('https://james-sprint1.herokuapp.com/api/projects')
    .then(res =>setProjData(res.data))
    .catch(err=>(err))

  })

  return (
    <div className="App">
      <h2>Here are your projects!</h2>
      <div>
        {projData.map(data =>{
          return(
            <div>
              <h3>Project: {data.name}</h3>
              <p>Project Description: {data.description}</p>
              
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
