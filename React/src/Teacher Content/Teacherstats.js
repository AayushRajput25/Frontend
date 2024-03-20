import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useState , useEffect} from 'react';

const PolarAreaChart = () => {
    const email = sessionStorage["email"];
  // Hardcoded student data
  const [studentData, setstudentdata] = useState([]);

  const [refValue, setRefValue] = useState("");
 
  useEffect(() => {
    axios.get("http://localhost:8080/home/" + email).then((Response) => {setRefValue(Response.data)});
  }, [email]);

  console.log(refValue)

  React.useEffect(() => {
    axios.get(`http://localhost:8080/teacher/data/` + refValue.id)
      .then((response) => {
        console.log(response.data);
        setstudentdata(response.data);
      })
      .catch((error) => {
      });
  }, [refValue]);

  const chartData = {
    labels: studentData.map(item => item.name),
    datasets: [
      {
        data: studentData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };

  return (<>    <Navbar/>
<div className="container mt-4">
      <div className="card p-3 shadow">
        <p className="mb-4">No. of Students for each Course</p>
        <div className="row mt-4">
          <div className="col-md-8 mx-auto">
            <PolarArea data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
</>

  );
};

export default PolarAreaChart;
