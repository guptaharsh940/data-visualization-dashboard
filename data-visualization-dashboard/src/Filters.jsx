import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Table from './Card/Table';
const Filters = () => {
  const [data, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({'title': [], 'pestle': [], 'insight': [], 'country': [], 'start_year': [], 'end_year': [], 'intensity': [], 'topic': [], 'region': [], 'sector': [], 'source': [], 'impact': [], 'relevance': [], 'likelihood': [], 'url': []});
  const [optionList,setOptions] = useState([])
  const [checkboxValues, setCheckboxValues] = useState([
    { id: 0, value: true },
    { id: 1, value: true },
    { id: 2, value: true },
    { id: 3, value: true },
    { id: 4, value: true },
    { id: 5, value: true },
    { id: 6, value: true },
    { id: 7, value: true },
    { id: 8, value: true },
    { id: 9, value: true },
    { id: 10, value: true },
    { id: 11, value: true },
    { id: 12, value: true },
    { id: 13, value: true },
    { id: 14, value: true },
  ]);

  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8888/data", {
      method: "POST",
      body: JSON.stringify(selectedOptions),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const temp = await res.json();
    console.log(temp);
    // const data1 = [{label:label1+label2, data:temp}]
    setData(temp["data"]);
    setOptions(temp["options"]);
  }
  // const fetchOptions = async() =>{
  //   const res = await fetch("http://127.0.0.1:8888/distinct");
  //   const temp = await res.json();
  //   setOptions(temp);
  // }


  // const optionList = [
  //   { 'value': "red", 'label': "Red" },
  //   { 'value': "green", 'label': "Green" },
  //   { 'value': "yellow", 'label': "Yellow" },
  //   { 'value': "blue", 'label': "Blue" },
  //   { 'value': "white", 'label': "White" }
  // ];
  function handleSelect(index, data) {
    const updateData = { ...selectedOptions };
    updateData[index] = data;
    setSelectedOptions(updateData);
    // console.log(selectedOptions);
    // fetchData();
  }
  const handleCheckboxChange = (id) => {
    const updatedCheckboxValues = checkboxValues.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, value: !checkbox.value } : checkbox
    );
    setCheckboxValues(updatedCheckboxValues);
  };
  useEffect(() => {
    fetchData();
    // fetchOptions();
  }, [selectedOptions]);
  const title = [{ key: 'title', label: 'Title' },
  { key: 'pestle', label: 'Pestle' },
  { key: 'insight', label: 'Insight' },
  { key: 'country', label: 'Country' },
  { key: 'start_year', label: 'Start Year' },
  { key: 'end_year', label: 'End Year' },
  { key: 'intensity', label: 'Intensity' },
  { key: 'topic', label: 'Topic' },
  { key: 'region', label: 'Region' },
  { key: 'sector', label: 'Sector' },
  { key: 'source', label: 'Source' },
  { key: 'impact', label: 'Impact' },
  { key: 'relevance', label: 'Relevance' },
  { key: 'likelihood', label: 'Likelihood' },
  { key: 'url', label: 'URL' }]

  return (
    <div>
      <button class="btn btn-primary" type="button" style={{ margin: 10 }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" > <i class='fa fa-filter'></i> Filter</button>
      <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="static" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Filter</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={fetchData}></button>
        </div>
        <div class="offcanvas-body">
          <div>
          {title.map((item,index)=>(
            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group" style={{margin:5}}>
              <input type="checkbox" className="btn-check" id={"btncheck"+index} autocomplete="off" checked={checkboxValues[index].value} onChange={() => handleCheckboxChange(index)}/>
              <label className="btn btn-outline-primary" for={"btncheck"+index}> {item.label} </label>  
              </div>
              ))}
              <br/>
            {title.map((item,index)=>(
            <><h7>{item.label}</h7>
            <div className="dropdown-container">
              <Select
                options={optionList[item.key]}
                isMulti
                closeMenuOnSelect={false}
                placeholder={item.label}
                value={selectedOptions[item.key]}
                onChange={(selectedItems) => handleSelect(item.key, selectedItems)} />
            </div>
            </>))}
          </div>
        </div>
      </div>
      <Table title={title} data={data} check={checkboxValues}/>
    </div>
  );




};

export default Filters;
