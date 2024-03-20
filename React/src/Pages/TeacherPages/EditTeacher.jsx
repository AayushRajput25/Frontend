import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function EditTeacher() {
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    age: 0,
    gender: "",
    phoneNo: "",    
    degree: "",
    specialization: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details based on the email
        const response = await axios.get('http://localhost:8080/home/' + sessionStorage['email']);
        const id = response.data.id;

        // Fetch teacher details based on the ID
        const teacherResponse = await axios.get(`http://localhost:8080/teacher/${id}`);
        const { name, age, gender, phoneNo, degree, specialization } = teacherResponse.data;

        // Update only the relevant fields in userData
        setUserData(prevData => ({
          ...prevData,
          id,
          name,
          age,
          gender,
          phoneNo,
          degree,
          specialization
        }));
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };

    fetchData();
  }, []);

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
      // Update teacher details based on the ID
      const response = await axios.put(`http://localhost:8080/teacher`, userData);
      if (response.status === 202) {
        console.log("Update ho gaya");
        console.log(userData);
        navigate('/teacher_dashboard');
      } else {
        console.log("Nhi hua bhai");
      }
      // Reset the form after successful submission
      setUserData({
        id: 0,
        name: "",
        age: 0,
        gender: "",
        phoneNo: "",
        degree: "",
        specialization: ""
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Background imageUrl={'https://wallpapercave.com/wp/wp8063327.jpg'}>
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
  <label className="form-label">Degree:</label>
  <input
    type="text"
    name="degree"  // Change 'address' to 'degree'
    value={userData.degree}
    onChange={handleChange}
    className="form-control"
    required
  />
</div>

<div className="mb-3">
  <label className="form-label">Specialization:</label>
  <input
    type="text"
    name="specialization"  // Change 'address' to 'specialization'
    value={userData.specialization}
    onChange={handleChange}
    className="form-control"
    required
  />
</div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </form>

        </div>
      </div>
      <Footer />
    </Background>
  );
}

export default EditTeacher;
