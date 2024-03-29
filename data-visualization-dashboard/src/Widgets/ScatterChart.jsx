import React, { useState,useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ScatterChart = ({ label1, label2 }) => {
  const [data, setData] = useState([]);
  // Sample data in JSON format
  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8888/var?list="+label1+"%2C"+label2);
    const temp = await res.json();
    const data1 = [{label:label1+label2, data:temp}]
    setData(data1);
    // console.log(data);
  };
   // Fetch data on mount
   useEffect(() => {
    fetchData();
    // console.log(data);
  }, []);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance, if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Prepare the data for the chart
    const datasets = data.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      // backgroundColor: 'rgba(0, 123, 255, 0.5)', // Customize the dot color
      // borderColor: 'rgba(0, 123, 255, 1)', // Customize the dot border color
    }));

    // Create the chart
    chartInstanceRef.current = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets,
      },
      options: {
        scales: {
          x: {
            type: 'linear', // Use linear scale for X-axis
            position: 'bottom',
          },
          
        },
      },
    });

    // Clean up the chart instance when the component unmounts
    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  return (
    
  <div className="col-md-6 py-1">
    
    <div className="card">
      
      <div className="card-body">
        <canvas ref={chartRef} />
      
  </div>
  
    </div>

    </div>);
};

export default ScatterChart;
