
import React from 'react';
import ScatterChart from './Widgets/ScatterChart';
import PieChart from './Widgets/PieChart';

const Visualization = () => {




    return (
        <div>

            <div className="card">
                <h1>Scatter Chart</h1>
                <div className="container">
                    <div className="row py-1">


                        <ScatterChart label1="intensity" label2="likelihood" />
                        <ScatterChart label1="intensity" label2="relevance" />
                    </div>
                </div>
            </div>

            <div className="card">
                <h1>Pie Chart</h1>
                <div className="container">
                    <div className="row py-1">

                        <PieChart chartKey="sector" />
                        <PieChart chartKey="topic" />
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Visualization;
