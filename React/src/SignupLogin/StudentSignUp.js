import React, { useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, CardHeader, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
const SignUp = (props) => {

  const[data, setdata] = useState({
    email : "",   name : "", password : "" , address : "" , age : "" , gender: "Male", phoneNo: ""
  })
  const navigate = useNavigate() 


useEffect(() => {
  console.log(data)}, [data]
)


  const handleChange = (event, property) => {
setdata({...data, [property]:event.target.value})
  }


  const serverUrl = "http://localhost:8080/users/student_signup";

  const addrecord = (event) => {
    event.preventDefault()
    console.log(data);
    // const headers = {
    //   headers: {
    //     Authorization: sessionStorage['Authenticate'],
    //   }
    // }
    axios.post(serverUrl, data).then((response) => {
      console.log("Success")
    }).catch((error) => {console.log(error)});
    setdata({email : "",   name : "", password : "" , address : "" , age : "" , gender: "Male", phoneNo: ""})
    navigate('/')
  };

  return (
    <div>
    <Background imageUrl={'https://wallpapers.com/images/hd/ipad-air-2-pokheo6zb9dxpl3w.jpg'}>

      <Container>
          <Card>
          <CardHeader> <h1 className='text-center my-2'>Sign Up for Student</h1></CardHeader>
     
     <CardBody>
    <Form onSubmit={addrecord}> 

    <FormGroup row>
        <Label for="name" sm={2}>Full Name</Label>
        <Col sm={10}>
          <Input type="text" id="namee" placeholder="Enter your Name here" 
          onChange={(e)=>handleChange(e, 'name')} value={data.name}/>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="exampleEmail" sm={2}>Email</Label>
        <Col sm={10}>
          <Input type="email" name="email" required id="exampleEmail" placeholder="Enter your Email here" 
           onChange={(e)=>handleChange(e, 'email')} value={data.email}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>Password</Label>
        <Col sm={10}>
          <Input type="password" required name="password" id="examplePassword" placeholder="Enter your Password here"
          onChange={(e)=>handleChange(e, 'password')} value={data.password} />
        </Col>
      </FormGroup>

      <FormGroup>
        <Label for="Phone no.">Phone</Label>
        <Input
          type="text"
          name="number"
          required
          id="exampleNumber"
          placeholder="Enter your Phone no. here"
          onChange={(e)=>handleChange(e, 'phoneNo')} value={data.phoneNo}
        />
       </FormGroup>
    
     
      <FormGroup row>
        <Label for="exampleText" sm={2}>Address</Label>
        <Col sm={10}>
          <Input type="textarea" name="text" id="exampleText" required
          onChange={(e)=>handleChange(e, 'address')} value={data.address} />
        </Col>
      </FormGroup>

      {/* <FormGroup row>
        <Label for="exampleFile" sm={2}>Photo</Label>
        <Col sm={10}>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </Col>
      </FormGroup> */}

<FormGroup>
        <Label for="age">Age</Label>
        <Input
          type="number"
          name="number"
          id="age"
          required
          placeholder="Enter your Age here"
          onChange={(e)=>handleChange(e, 'age')}
          value={data.age}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect">Gender</Label>
        {/* <Input type="select" name="select" id="exampleSelect"  value={data.selectedOption}
     onChange={(e)=>handleChange(e, 'gender')}   >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Email">Email</option>
        </Input> */}
            <select
      value={data.gender} // ...force the select's value to match the state variable...
      onChange={(e)=>handleChange(e, 'gender')} // ... and update the state variable on any change!
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
      </FormGroup>
    
      {/* <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          required
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup> */}

      <FormGroup row>
        <Label for="checkbox2" sm={3}>I agree to terms and conditions</Label>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="checkbox2" required/>{' '}
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
    </ Background>
    </div>
  );
}

export default SignUp;
