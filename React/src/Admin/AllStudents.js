
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter
, InputGroup, InputGroupText, Input, Label} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const AllStudents = (args) => {
    const [refValue, setRefValue] = useState("");
    const [studentemailfromid, setstudentemailfromid] = useState("");
    const [Students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const[emailbody, setemailbody] = useState({
      recipient: "",
      msgBody: "",
      subject: ""
    })

    useEffect(() => {
        fetchStudents()
    }, []);

    useEffect(() => {
      console.log(emailbody)
  }, [emailbody]);
  
    const fetchStudents = () => {
      axios.get(`http://localhost:8080/admin/student`)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const deleteStudent = (id) => {
      const serverUrl = `http://localhost:8080/admin/student/${id}`;
      axios.delete(serverUrl).then(() => {
        setStudents(prevCourses => prevCourses.filter(Students => Students.id !== id));
      }).catch((error) => {
        console.log(error);
      });
    }

    const SendEmail = (id) => {
   //   console.log(id.id)
      axios.get(`http://localhost:8080/student/${id.id}`)
        .then((response) => {
          setemailbody(prevEmailBody => ({
            ...prevEmailBody,
            recipient: response.data.email, 
          }));
        })
        .catch((error) => {
          setError(error);
        })
         
      toggle()
    }

    const handleChange = (event, property) => {
      setemailbody({...emailbody, [property]:event.target.value})
        } 

        const send = () => {
          const serverUrl = "http://localhost:8080/email";
          axios.post(serverUrl, emailbody).then((response) => {
            console.log("Success")
            toast.success('Email Sent');
          }).catch((error) => {console.log(error)});
        }

    return(<div>
        <br></br>
        <h1 className="text-center mr-4">All Students</h1>
        <br></br>
        <br></br>
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>PhoneNo</th>
                <th>Address</th>
                <th>Delete</th>
                <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {Students.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.phoneNo}</td>
                  <td>{item.Address}</td>
                  <td>
                    <Button color="danger" size="sm" className="ml-4" onClick={() => deleteStudent(item.id)}>delete</Button></td>
                  <td>  <Button color="primary" size="sm" className="ml-4" onClick={() => SendEmail(item)}>Email</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* <Button color="danger" onClick={toggle}>
        Click Me
      </Button> */}

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Send Email</ModalHeader>
        <ModalBody>
        <Label for="exampleEmail" sm={2}>To : </Label>
        <h6> {emailbody.recipient} </h6>
    <br/>
    <br/>

    <InputGroup>
    <InputGroupText>
      Subject
    </InputGroupText>
    <Input placeholder="Enter your Subject here" 
           onChange={(e)=>handleChange(e, 'subject')} value={emailbody.subject}/>
  </InputGroup>

<br/>

  <InputGroup>
    <InputGroupText>
      Body
    </InputGroupText>
    <Input type="textarea" placeholder="Enter your Body here" 
           onChange={(e)=>handleChange(e, 'msgBody')} value={emailbody.msgBody}/>
  </InputGroup>


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {toggle(); send()}}>
            Send
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </div>)
    }
    export default AllStudents
