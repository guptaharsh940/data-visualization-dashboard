
import React, {useState, useEffect} from 'react';
import ScatterChart from './ScatterChart';

const App = () => {
  const [data, setData] = useState([{"x":10,"y":20}]);
  // Sample data in JSON format
  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8888/var?list=intensity%2Crelevance");
    const temp = await res.json();
    const data = [{label:"intensityvsrelevence", data:temp}]
    setData(data);
    console.log(data);
  };
   // Fetch data on mount
   useEffect(() => {
    fetchData();
    // console.log(data);
  }, []);

  

  return (
    <div>
      <h1>Scatter Chart</h1>
      <ScatterChart data={data} />
    </div>
  );
};

export default App;
