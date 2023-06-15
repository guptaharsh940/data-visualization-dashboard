
import React from 'react';
import ScatterChart from './ScatterChart';

const App = () => {
  

  

  return (
    <div className="card">
      <h1>Scatter Chart</h1>
    <div className = "container">
    <div className = "row py-1">
      
        
      <ScatterChart label1="intensity" label2 = "likelihood" />
      <ScatterChart label1="intensity" label2 = "relevance" />
      </div>
      </div>
    </div>
    
  );
};

export default App;
