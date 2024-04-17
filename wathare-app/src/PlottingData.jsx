import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const TimeSlot = ({ timestamp, status }) => {
  // Determine the background color based on the status
  const statusColor =
    status === 1
      ? "green"
      : status === 0
      ? "orange"
      : "red";

  const slotStyle = {
    width: '0.2px',
    height: '22px',
    backgroundColor: statusColor,
  };
  // const formattedTimestamp = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}:${timestamp.getSeconds().toString().padStart(2, '0')}`;


  // Each time slot is a horizontal rectangle (wider than it is tall)
  return <div style={{position: 'relative'}}>
  <div style={slotStyle}></div>
  <span style={{ position: 'absolute', bottom: '-20px', left: '0', width: '100%', textAlign: 'center'}}></span>
  </div>;
};
 
const Timeline = ({ data }) => {
  return (
    <div className="d-flex align-items-center py-2">
      <div className="d-flex bg-light p-3 rounded overflow-auto">
        {data.map((slot, index) => {
          // Parse current and previous timestamps to compare hours
          const currentHour = new Date(slot.ts).getHours();
          const previousHour = index > 0 ? new Date(data[index - 1].ts).getHours() : null;
          
          // Pass timestamp only if the current hour is greater than the previous hour
          const timestamp = previousHour !== null && currentHour > previousHour ? slot.ts : null;

          return <TimeSlot key={index} status={slot.machine_status} timestamp={timestamp} />;
        })}
      </div>
    </div>
  );
};
const CycleStatus = ({ data }) => {
  // Container with horizontal padding and margin for alignment
  return (
    <div className="container px-4 my-3">
      <h2 className="h2 fw-semibold mb-3">Cycle Status</h2>
      <Timeline data={data} />
    </div>
  );
};

const PlottingData = () => {
    const [data, setData] = useState([]);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/wathare');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

 

    return (
        <>
            <CycleStatus data={data} />

           
        </>
    );
};

export default PlottingData;
