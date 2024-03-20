import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container, CardHeader, CardBody, Card, Row } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import Background from '../components/Background.jsx';
import './SignIn.css';
import Footer from '../components/Footer.jsx';


const SignIn = (props) => {
  const [data, setdata] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const navigate = useNavigate();

  const serverUrl = 'http://localhost:8080/users/signin';

  const handleChange = (event, property) => {
    setdata({ ...data, [property]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(serverUrl, data);

      if (result.data.message === 'Successful Authentication!!') {
        
        const token = result.data.jwt;
        sessionStorage['email'] = data.email;
        sessionStorage['Authorization'] = 'Bearer ' + token;
        toast.success(result.data.message);

        const rolee = await axios.get('http://localhost:8080/home/' + data.email);
      
        if (rolee.data.role === 'ROLE_TEACHER') {
          navigate('/teacher_dashboard');
        } else if (rolee.data.role === 'ROLE_STUDENT') {
          navigate('/student_dashboard');
        } else if (rolee.data.role === 'ROLE_ADMIN') {
          navigate('/Adminpanel');
        }

      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  };
  
  return (
    <Background imageUrl={'https://wallpapers.com/images/hd/ipad-air-2-pokheo6zb9dxpl3w.jpg'}>
      <div>
        <br />
        <br />
        <Container className="container-card">
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              <Card>
                <CardHeader>
                  <h1 className="card-header">Sign In Page</h1>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={login}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>
                        Email
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="Enter your Email here"
                          onChange={(e) => handleChange(e, 'email')}
                          value={data.email}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="examplePassword" sm={2}>
                        Password
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Enter your Password here"
                          onChange={(e) => handleChange(e, 'password')}
                          value={data.password}
                        />
                      </Col>
                    </FormGroup>
                    <Button color="success" outline>
                      Sign In
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <br />
        <div className="text-center-options">
          <h3 className="options-header">Not A Member Yet?</h3>
          <Link className="options-link" tag="A" to="/StudentSignup">
            <h4>Register as Student</h4>
          </Link>
          <Link className="options-link" tag="A" to="/TeacherSignUP">
            <h4>Register as Teacher</h4>
          </Link>
        </div>
        <ToastContainer />
      </div>
      <div className='footer'><Footer/></div>
    </Background>
  );
};

export default SignIn;