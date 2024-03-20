import React, { useEffect, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, CardHeader, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';

const TeacherSignUp = (props) => {
  const[data, setdata] = useState({
    email : "",   name : "", password : "" , address : "" , age : "" , gender: "Male", phoneNo: "" ,degree: "",
    specialization: ""
  })

  const navigate = useNavigate() 

useEffect(() => {
  console.log(data)}, [data]
)

  const handleChange = (event, property) => {
setdata({...data, [property]:event.target.value})
  }

  const serverUrl = "http://localhost:8080/users/teacher_signup";

  const addrecord = (event) => {
    event.preventDefault()
    console.log(data);
    axios.post(serverUrl, data).then((response) => {
      console.log("Success")
    }).catch((error) => {console.log(error)});
    setdata({email : "",   name : "", password : "" , address : "" , age : "" , gender: "Male", phoneNo: "" ,degree: "",
    specialization: ""})
    navigate('/')
  };



  return (
    <div>
    <Background imageUrl={'https://wallpapers.com/images/hd/ipad-air-2-pokheo6zb9dxpl3w.jpg'}>
      
      <Container>
          <Card>
          <CardHeader> <h1 className='text-center my-2'>Sign Up for Teacher</h1></CardHeader>
     
     <CardBody>
    <Form onSubmit={addrecord}> 

    <FormGroup row>
        <Label for="name" sm={2}>Full Name</Label>
        <Col sm={10}>
          <Input type="text" id="firstName" placeholder="Enter your Name here" required  onChange={(e)=>handleChange(e, 'name')} value={data.firstName}/>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="email" sm={2}>Email</Label>
        <Col sm={10}>
          <Input type="email" id="email"  placeholder="Enter your Email here" required onChange={(e)=>handleChange(e, 'email')} value={data.email}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={2}>Password</Label>
        <Col sm={10}>
          <Input type="password" id="password" placeholder="Enter your Password here" required onChange={(e)=>handleChange(e, 'password')} value={data.password}/>
        </Col>
      </FormGroup>
    
     
      <FormGroup row>
        <Label for="address" sm={2}>Address</Label>
        <Col sm={10}>
          <Input type="textarea"  id="address" required onChange={(e)=>handleChange(e, 'address')} value={data.address}/>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="Degree" sm={2}>Degree</Label>
        <Col sm={10}>
          <Input type="text" id="degree" placeholder="Enter your Degree here" required onChange={(e)=>handleChange(e, 'degree')} value={data.degree}/>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="name" sm={2}>Specialization</Label>
        <Col sm={10}>
          <Input type="text" id="specialization" required placeholder="Enter your specialization here" onChange={(e)=>handleChange(e, 'specialization')} value={data.specialization}/>
        </Col>
      </FormGroup>
      
      <FormGroup row>
        <Label for="exampleFile" sm={2}>Photo</Label>
        <Col sm={10}>
          <Input type="file" name="file" required id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </Col>
      </FormGroup>

      <FormGroup tag="fieldset" row>
        <legend className="col-form-label col-sm-2">Gender</legend>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" />{' '}
             Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" />{' '}
            Female
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio2" disabled />{' '}
             Others
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>


      <FormGroup row>
        <Label for="checkbox2" sm={3}>I agree to terms and conditions</Label>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="checkbox2" required />{' '}
              Agree
            </Label>
          </FormGroup>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Container className='text-center'>
          <Button color='success' outline>Sign up</Button>
          <Button color='dark' type='reset' className='ml-4' outline>Reset</Button>
          </Container>
        </Col>
      </FormGroup>
    </Form>
    </CardBody>
    </Card>
    </Container>
    </Background>
    </div>
  );
}

export default TeacherSignUp;
