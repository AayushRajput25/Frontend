import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FetchStudents = () => {
  const [refValue, setRefValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = sessionStorage["email"];

  useEffect(() => {
    axios.get("http://localhost:8080/home/" + email)
      .then((response) => {
        setRefValue(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [email]);

  useEffect(() => {
    if (refValue.id) {
      fetchCourses(refValue.id);
    }
  }, [refValue]);

  const fetchCourses = (id) => {
    axios.get(`http://localhost:8080/teacher/enroll/${id}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteSomething = (id) => {
    console.log(id.enrollmentId);
    const serverUrl = `http://localhost:8080/student/enroll/${id.enrollmentId}`;
    axios.delete(serverUrl)
      .then(() => {
        

        // Refetch courses after successful deletion
        fetchCourses(refValue.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Background imageUrl={'https://wallpapercave.com/wp/wp8063327.jpg'}>
        <Navbar />
        <br />
        <h1 className="text-center mr-4">My Students</h1>
        <br />
        <br />
        <div>
          <Table hover bordered className="table-primary">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Unenroll Student</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item) => (
                <tr key={item.student_id}>
                  <td>{item.student_id}</td>
                  <td>{item.name}</td>
                  <td>{item.course_name}</td>
                  <td>
                    <Button color="danger" onClick={() => deleteSomething(item)} size="sm" className="ml-4">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      
      </Background>
    </div>
  );
};

export default FetchStudents;
