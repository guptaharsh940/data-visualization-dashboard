import React from "react";
const Table = ({title,data,check}) => {
    return (
        <div className="App">
            <table className="table" style={{marginLeft:10, textAlign:"center"}}>
                {/* <tbody> */}
                <thead style={{ position: 'sticky', top: 0 }} className="table-dark">                        
                    <tr>
                        {
                            title.map((item,index) => (
                                check[index].value
                                ? <th>{item.label}</th>
                                : null
                            ))
                        }
                    </tr>
                    </thead>
                    {data.map((item, index) => (
                        <tr key={index} style={{borderBottom:'1px solid black'}}>
                            {title.map((name,index) => (
                                check[index].value
                                ? (name.key==='url'
                                ? <td><a href={item[name.key]}>Link</a></td>
                                : <td>{item[name.key]}</td>)
                                : null
                            ))}
                        </tr>
                    ))}
                {/* </tbody> */}
            </table>
        </div>

    )
};

export default Table;