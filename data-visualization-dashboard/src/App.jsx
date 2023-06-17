
import React from 'react';
import Summary from './Card/Summary';

const App = () => { 
  return (
    <div>

      <div className="card">
        <div className="container">
          <div className="row py-1">
            <Summary category="sector" title="Top Sectors"/>
            <Summary category="topic" title="Top Topics"/>
          </div>
        </div>
        <div className="container">
          <div className="row py-1">
            <Summary category="region" title="Top Regions"/>
            <Summary category="country" title="Top Countries"/>
          </div>
        </div>
        <div className="container">
          <div className="row py-1">
            <Summary category="pestle" title="Top Pestles"/>
            <Summary category="source" title="Top Sources"/>
          </div>
        </div>
      </div>

    

    </div>

  );
};

export default App;
