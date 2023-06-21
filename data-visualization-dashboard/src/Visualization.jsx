import React, { useState, useEffect } from 'react';
import ScatterChart from './Widgets/ScatterChart';
import PieChart from './Widgets/PieChart';
import Select from "react-select";

const Visualization = () => {
  const [selectedOption, setselectedOption] = useState({ x: { value: 'relevance', label: 'Relevance' }, y: { value: 'intensity', label: 'Intensity' } });
  const [scatterKey, setScatterKey] = useState(0);
  const options = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'intensity', label: 'Intensity' },
    { value: 'likelihood', label: 'Likelihood' },
  ];

  const handleChange = (option, axis) => {
    const updated = { ...selectedOption };
    updated[axis] = option;
    setselectedOption(updated);
  };

  const handleClick = () => {
    setScatterKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    console.log("Scatter key changed:", scatterKey);
  }, [scatterKey]);

  return (
    <div>
      <div className="card">
        <div className="container">
          <div className="row py-1">
            <PieChart chartKey="country" label="Country" />
            <PieChart chartKey="topic" label="Topic" />
            <PieChart chartKey="region" label="Region" />
          </div>
          <div className="row py-1">
            <PieChart chartKey="topic" label="Topic" />
            <PieChart chartKey="start_year" label="Start Year" />
            <PieChart chartKey="end_year" label="End Year" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="container">
          <div className="row py-1">
            <ScatterChart
              key={scatterKey}
              label1={selectedOption["x"].value}
              label2={selectedOption["y"].value}
            />
            <div className="col-md-6 py-1">
              <div className="card">
                <div className="card-body">
                  <h5 style={{margin:'15px 0px 10px 2px'}}>X-Axis</h5>
                  <Select
                    value={selectedOption["x"]}
                    onChange={(selected) => handleChange(selected, "x")}
                    options={options}
                    />
                    <h5 style={{margin:'20px 0px 10px 2px'}}>Y-Axis</h5>
                  <Select
                    value={selectedOption["y"]}
                    onChange={(selected) => handleChange(selected, "y")}
                    options={options}
                  />
                  <button onClick={handleClick} type="button" className="btn btn-secondary" style={{margin:'20px 0px'}}>Done</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
