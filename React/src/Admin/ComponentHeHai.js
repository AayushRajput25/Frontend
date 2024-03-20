import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const ComponentHeHai = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/data');
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Sorting courses in decreasing order of enrollment counts
  const sortedCourses = courseData.slice().sort((a, b) => b.count - a.count);

  return (
    <div className="container" > {/* Change background color here */}
      <h2 className="title">Courses Enrollment</h2>
      {sortedCourses.length > 0 ? (
        <Plot
          data={[
            {
              x: sortedCourses.map(course => course.coursename),
              y: sortedCourses.map(course => course.count),
              type: 'bar',
              marker: { color: '#484848' } // Change the color here
            }
          ]}
          layout={{
            width: 800,
            height: 400,
            title: 'Courses with Enrollment Counts (Decreasing Order)',
            xaxis: { title: 'Course' },
            yaxis: { title: 'Enrollments' },
            plot_bgcolor: '#6AB187', // Change background color here
            paper_bgcolor: '#6AB189', // Change background color here
          }}
          config={{ displaylogo: false }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ComponentHeHai;
