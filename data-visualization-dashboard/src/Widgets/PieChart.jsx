import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ chartKey, label }) => {
  const [data, setData] = useState({ label: [], value: [] });
  const [isShown, setIsShown] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`http://127.0.0.1:8888/pie?key=${chartKey}`);
    const temp = await res.json();
    console.log(temp);
    setData({
      label: temp[0],
      value: temp[1],
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
      datasets: [
        {
          label: 'Frequency',
          data: value,
          hoverOffset: 4,
        },
      ],
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: datasets,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    setChartInstance(chartInstanceRef.current);

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.options.plugins.legend.display = isShown;
      chartInstance.update();
    }
  }, [isShown, chartInstance]);

  return (
    <div className="col-md-4 py-1">
      <div
        className="card"
        onMouseOver={() => setIsShown(true)}
        onMouseOut={() => setIsShown(false)}
      >
        <h2 style={{ textAlign: 'center', padding: '10px 0px 0px 0px', margin: 0 }}>{label}</h2>
        <div className="card-body">
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
