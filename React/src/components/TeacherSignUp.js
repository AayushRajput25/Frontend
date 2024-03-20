import React, { useState } from 'react';
import axios from 'axios';
import Background from './Background';

function TeacherSignUp() {
  const [userData, setUserData] = useState({
    name: "",
    age: 20,
    gender: "Male",
    phoneNo: "3215588954",
    email: "@gmail.com",
    password: "12345",
    address: "korba",
    degree: "B.E",
    specialization: "kuchbhi"
  });

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
      const response = await axios.post('http://localhost:8080/users/teacher_signup', userData);
      console.log(response.data);
      // Reset the form after successful submission
      setUserData({
        name: "ashish",
        age: 20,
        gender: "Male",
        phoneNo: "3215588954",
        email: "ashish@gmail.com",
        password: "12345",
        address: "korba",
        degree: "B.E",
        specialization: "kuchbhi"
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Background imageUrl={sessionStorage.getItem('bgimg')}>
      <div className="container mt-4" style={{ maxWidth: '700px' }}>
        <div className="card p-3 shadow">
          <h2 className="mb-3 text-center">Teacher SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
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
              <label htmlFor="age" className="form-label">Age:</label>
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
              <label htmlFor="gender" className="form-label">Gender:</label>
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
              <label htmlFor="phoneNo" className="form-label">Phone Number:</label>
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
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="degree" className="form-label">Degree:</label>
              <input
                type="text"
                name="degree"
                value={userData.degree}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="specialization" className="form-label">Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={userData.specialization}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </Background>  
  );
}

export default TeacherSignUp;
