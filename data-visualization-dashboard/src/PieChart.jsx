import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ chartKey }) => {
  const [data, setData] = useState({ label: [], value: [] });

  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8888/pie?key=" + chartKey);
    const temp = await res.json();
    console.log(temp);
    setData({
      label: temp[0],
      value: temp[1]
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const { label, value } = data;

    const datasets = {
      labels: label,
      datasets: [{
        label: 'Frequency',
        data: value,
        hoverOffset: 4
      }]
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: datasets,
    });

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  return (
    <div className="col-md-6 py-1">
      <div className="card">
        <div className="card-body">
          <canvas ref={chartRef} />
          <h2>{chartKey}</h2>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
