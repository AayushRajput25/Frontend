
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import { useNavigate , Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AllTeachers = () => {
    const [refValue, setRefValue] = useState("");
    const [Teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigate = useNavigate();
  const deleteCourse = (id) => {
    const serverUrl = `http://localhost:8080/admin/teacher/${id}`;
    axios.delete(serverUrl).then(() => {
      setTeachers(prevCourses => prevCourses.filter(Teacher => Teacher.id !== id));
    }).catch((error) => {
      console.log("");
      toast.warn('Cannot Delete! Somebody has Enrolled for this Teacher, ');
    }
    );
  }

  const prevCourses = (id) => {
    console.log(id)
    //const previewCourse = sessionStorage[" previewCourse"];
     sessionStorage['teacherid'] = id
     navigate("/AdminTeacherCourses")
  }
  
 //   const email = sessionStorage["email"];
  
    // useEffect(() => {
    //   axios.get("http://localhost:8080/home/" + email)
    //     .then((response) => {
    //       setRefValue(response.data);
    //     })
    //     .catch((error) => {
    //       setError(error);
    //     });
    // }, [email]);
  
    useEffect(() => {
        fetchTeachers()
    }, []);
  
    const fetchTeachers = () => {
      axios.get(`http://localhost:8080/admin/teacher`)
        .then((response) => {
          setTeachers(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

return(
<div>
      <br></br>
      <h1 className="text-center mr-4">All Teachers</h1>
      <br></br>
      <br></br>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Teacher Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>PhoneNo</th>
              <th>degree</th>
              <th>specialization</th>
              <th>Delete</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {Teachers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.phoneNo}</td>
                <td>{item.degree}</td>
                <td>{item.specialization}</td>
                <td>
                  <Button color="danger" size="sm" className="ml-4" onClick={() => deleteCourse(item.id)}>Delete</Button>
                </td>
                <td>
                  <Button color="warning" size="sm" className="ml-4"  onClick={() => prevCourses(item.id)}>Preview Course</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    )
}
export default AllTeachers