import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart, registerables } from 'chart.js';
import ComponentHai from './ComponentHai';
import ComponentHeHai from './ComponentHeHai';

Chart.register(...registerables);

function AnalyticsPage() {
  const [ageChartData, setAgeChartData] = useState(null);
  const [genderChartData, setGenderChartData] = useState(null);
  const [rawData, setrawData] = useState([]);
  const [totalRegisteredStudents, setTotalRegisteredStudents] = useState(0);
  const [totalEnrolledStudents, setTotalEnrolledStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  React.useEffect(() => {
    axios.get(`http://localhost:8080/admin/enrollment/day`)
      .then((response) => {
        console.log(response.data);
        setrawData(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      setAgeChartData(null);
      setGenderChartData(null);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/student');
      const data = response.data;

      if (data && data.length > 0) {
        // Calculate age group distribution
        const ageGroups = {
          '18 to 24': 0,
          'Below 18': 0,
          '24 to 30': 0,
          'Above 30': 0
        };

        data.forEach(entry => {
          const age = entry.age;
          if (age >= 18 && age <= 24) {
            ageGroups['18 to 24']++;
          } else if (age < 18) {
            ageGroups['Below 18']++;
          } else if (age > 24 && age <= 30) {
            ageGroups['24 to 30']++;
          } else {
            ageGroups['Above 30']++;
          }
        });

        // Calculate total registered students
        let totalStudents = 0;
        data.forEach(entry => {
          totalStudents++;
        });
        setTotalRegisteredStudents(totalStudents);

        // Create data for age group pie chart
        const ageChart = {
          labels: Object.keys(ageGroups),
          datasets: [
            {
              label: 'Age Group',
              data: Object.values(ageGroups),
              backgroundColor: [
                'rgba(94, 252, 3, 0.5)',
                'rgba(232, 252, 3, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
              ],
              borderWidth: 2.3
            }
          ],
          options: {
            plugins: {
              legend: {
                labels: {
                  color: 'Black' // Set legend label font color to white
                }
              }
            }
          }
        };
        

        setAgeChartData(ageChart);

        // Calculate gender distribution
        const genderCounts = {
          Male: 0,
          Female: 0,
          Others: 0
        };

        data.forEach(entry => {
          const gender = entry.gender.toLowerCase();
          if (gender === 'male' || gender === 'm') {
            genderCounts.Male++;
          } else if (gender === 'female' || gender === 'f') {
            genderCounts.Female++;
          } else {
            genderCounts.Others++;
          }
        });

        // Create data for gender doughnut chart
        const genderChart = {
          labels: Object.keys(genderCounts),
          datasets: [
            {
              label: 'Gender Distribution',
              data: Object.values(genderCounts),
              backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 206, 86, 0.5)'
              ],
              borderWidth: 2.3
            }
          ]
        };

        setGenderChartData(genderChart);

        // Calculate total enrolled students
        let totalEnrolled = 0;
        data.forEach(entry => {
          totalEnrolled += entry.count;
        });
        setTotalEnrolledStudents(totalEnrolled);

        // Calculate total number of teachers
        const totalTeachersCount = data.reduce((acc, curr) => {
          return acc.add(new Set(curr.tname));
        }, new Set()).size;
        setTotalTeachers(totalTeachersCount);
      } else {
        console.error('No data fetched or data is empty');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    try {
      const coursesResponse = await axios.get('http://localhost:8080/home/courses');
      const coursesData = coursesResponse.data;
      // Calculate total number of courses
      const coursesCount = Object.keys(coursesData).length;
      setTotalCourses(coursesCount);
    } catch (error) {
      console.error('Error fetching courses data:', error);
    }
  };

  const data = {
    labels: rawData.map(entry => entry.date),
    datasets: [
      {
        label: "days checkpoint",
        data: rawData.map(entry => entry.count),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const [data1, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/enrollment/teacher`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const labels = data1.map(entry => entry.tname);
  const countData = data1.map(entry => entry.count);

  const dynamicColors = countData.map(() =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`
  );

  const totalEnrolledStudentsAcrossTeachers = countData.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Count",
        data: countData,
        backgroundColor: dynamicColors,
        borderColor: "rgba(100,100,100,100)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
        title: {
          display: true,
          text: 'Teacher Name',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };

  return (
    <>
    <div className='container mt-4' style={{ backgroundColor: '#1C4E80' }}>
    <div className="container mt-4" >
        <div className="row">
          <div>
            <div className="row">
              <ComponentHai title="Total number of Registered Students" count={totalRegisteredStudents} />
              <ComponentHai title="Total Enrolled Students" count={totalEnrolledStudentsAcrossTeachers} />
            </div>
            <div className="row mt-4" >
              <ComponentHai title="Total number of Teachers" count={totalTeachers} />
              <ComponentHai title="Total Number of Courses" count={totalCourses} />
            </div>
          </div>
        </div>
      </div>

    <div className="container mt-4" >
      <div className="card p-3 shadow" style={{ backgroundColor: '#FAF9F6' }}>
        <h2 className="mb-3 text-center" >Analytics</h2>
        <p>Age Group and Gender analysis for students </p>
        <div className="row mt-4">
          <div className="col-md-6">
            {ageChartData ? (
              <Pie 
              data={ageChartData} 
              options={{
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: 'black' // Set legend label font color to white
                    }
                  }
                }
              }} 
            />
            ) : (
              <p>Loading age group chart...</p>
            )}
          </div>
          <div className="col-md-6">
            {genderChartData ? (
              <Doughnut data={genderChartData} options={{ plugins: { legend: { display: true, labels: {
                color: 'black' 
              } } } }} />
            ) : (
              <p>Loading gender distribution chart...</p>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="container mt-4">
      <div className="card p-3 shadow">
      <p>No. of students enrolled in a day </p>
        <div className="row mt-4">
          <div className="col-md-12">  
            <Line data={data} />
          </div>
        </div>
      </div>
    </div>

    <div className="container mt-4">
      <div className="card p-3 shadow">
      <p>No. of Students for each Teacher </p>
        <div className="row mt-4">
          <div className="col-md-12">  
          <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>

    <div className="container mt-4">
      <div className="card p-3 shadow" >
      <p style={{color: 'white'}}>Performance of Courses By Number of Enrollments</p> {/* Change text color here */}
              <div className="row mt-4"  >
          <div className="col-md-12" >  
          <ComponentHeHai/>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default AnalyticsPage;
