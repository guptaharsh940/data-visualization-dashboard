import React from 'react'
  
const Progress_bar = ({progress, text}) => {
  
    const Parentdiv = {
        height: 20,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        // transition: 'width 2s'
        // margin: '10px 0px'
      }
      
      const Childdiv = {
        display:'block',
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#1e87db",
        borderRadius:40,
        textAlign: 'right',
        // animation: 'fadeIn 5s'
      }
      
      const progresstext = {
        display: 'block',
        padding: "0px 10px 0px 0px",
        margin:0,
        fontSize: "14px",
        color: 'white',
        fontWeight: 500,
        textAlign: 'right',
        
        verticalAlign: 'middle'

      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${text}`}</span>
      </div>
    </div>
    )
}
  
export default Progress_bar;