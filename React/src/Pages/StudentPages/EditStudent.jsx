
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function EditStudent() {
  const id = sessionStorage.getItem('student_id');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    gender: "",
    phoneNo: "",
    address: "",
    id: id
  });

  useEffect(() => {
    // Fetch student details based on the ID
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${id}`);
        const { name, age, gender, phoneNo, address } = response.data;
        // Update only the relevant fields in userData
        setUserData(prevData => ({
          ...prevData,
          name,
          age,
          gender,
          phoneNo,
          address,
        }));
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/student`, userData);
      if (response.status === 202) {
        console.log("Update ho gaya");
        console.log(userData);
        navigate('/student_dashboard');
      } else {
        console.log("Nhi hua bhai");
      }
      // Reset the form after successful submission
      setUserData({
        name: "",
        age: 0,
        gender: "",
        phoneNo: "",
        address: "",
        id: 0
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Background imageUrl={'https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg'}>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: '700px' }}>
        <div className="card p-3 shadow">
          <h2 className="mb-3 text-center">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="form-control"
                required
                placeholder='Name'
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <input
                type="text"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                type="text"
                name="phoneNo"
                value={userData.phoneNo}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </form>

        </div>
      </div>

    </Background>
  );
}

export default EditStudent;
