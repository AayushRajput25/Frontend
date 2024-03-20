import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container
  } from 'reactstrap';
  import axios from "axios";

  const Course = ({course}) =>
  {

    const DeleteCourse = (id) =>
    {
      const serverUrl = `http://localhost:8080/teacher/course/${id}`
      axios.delete(serverUrl).then((response) => { console.log("Successfully deleted")
      }).catch((error) => {console.log(error)});
     
    }

return(
    <div >
    <Card className="text-center ml-3">
      <CardBody>    
        <CardSubtitle className="font-weight-bold">{course.courseName}</CardSubtitle>
        <CardText>{course.description}</CardText>
       <Container className="text-center">
       <Button color="warning">Add content </Button>
      <Button color="danger ml-3" onClick={() => DeleteCourse(course.id)}> Delete</Button>
       </Container>
      </CardBody>
    </Card>
  </div>
);
  }

  export default Course;