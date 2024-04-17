import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Analysis from './Analysis';
import PlottingData from './PlottingData';

function App() {

  const [displayData, setDisplayData] = useState([false]);

  
  const showDataTable = () => {
    if(displayData == false) {
      setDisplayData(true);
    } else {
      setDisplayData(false);

    }
  }


  return (
    <>
      {/* <Analysis /> */}
      

      <div className='container mt-5'>
        <div className='upper-bar d-flex mb-3'>
          <ul className='side-buttons d-flex'>
            <li className='btn btn-light'> 1 hr</li>
            <li className='btn btn-primary'>8 hr</li>
            <li className='btn btn-secondary'>24 hr</li>
            <li className='dropdown'><i className='fa-solid fa-bars dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul></i></li>
            <li><i className='fa-solid fa-circle-info'></i></li>
          </ul>
        </div>
        <p className='text-secondary'>Cycle Status</p>

        <div className='data-plotting bg-light'>
          {/* You can render any data visualization here */}
        </div>
        <button className='btn btn-success mt-4'>Check Location and Temperature</button>
        &nbsp;
        <button className='btn btn-success mt-4' onClick={showDataTable}>Show Data</button>

      {/* {if(displayData)} */}
      <PlottingData/>
        
      </div>
    </>
  );
}

export default App;
