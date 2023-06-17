import React, { useState,useEffect}  from "react";
import Progress_bar from "../Widgets/Progress_bar";

const Summary = ({category,title}) => {
    const [data, setData] = useState([{'category':"--","value":0},{'category':"--","value":0},{'category':"--","value":0},{'category':"--","value":0},{'category':"--","value":0}]);
  // Sample data in JSON format
  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8888/top?category="+category);
    const temp = await res.json();
    // const data1 = [{label:label1+label2, data:temp}]
    setData(temp);
    
  };
   // Fetch data on mount
   useEffect(() => {
    fetchData();
  }, []);
    return (
        <div className="col-md-6 py-1">
            <div className="card">
                <div className="card-body">
                    <h5 className = 'card-title text-center'>{title}</h5>
                    <div style={{ margin: "10px 0px" }}>
                        {data[0]['category']}
                        <Progress_bar progress={(data[0]['value']/data[0]['value'])*100} text={data[0]['value']} />
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        {data[1]['category']}
                        <Progress_bar progress={(data[1]['value']/data[0]['value'])*100} text={data[1]['value']} />
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        {data[2]['category']}
                        <Progress_bar progress={(data[2]['value']/data[0]['value'])*100} text={data[2]['value']} />
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        {data[3]['category']}
                        <Progress_bar progress={(data[3]['value']/data[0]['value'])*100} text={data[3]['value']} />
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        {data[4]['category']}
                        <Progress_bar progress={(data[4]['value']/data[0]['value'])*100} text={data[4]['value']} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Summary;