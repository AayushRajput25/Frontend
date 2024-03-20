import React, { useState } from "react";
import axios from "axios";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import Example from "../Teacher Content/Navbar";

const Addcontent = () => {
  const imp = sessionStorage["Course"];
  const serverUrl = `http://localhost:8080/teacher/course/content/${imp}`;

  const [data, setdata] = useState({
    description: "",
    title: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event, property) => {
    setdata({ ...data, [property]: event.target.value });
  };

  const addRecord = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(serverUrl, data);
      console.log(response.data.id)
      await uploadVideo(response.data.id);
      setdata({ description: "", title: "" });
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadVideo = async (id) => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);

        await axios.post(
          `http://localhost:8080/teacher/course/content/video/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Video upload successful");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Example />
      <br />
      <Form onSubmit={addRecord}>
        <FormGroup row>
          <Label for="description" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              id="description"
              placeholder="Enter your description here"
              onChange={(e) => handleChange(e, "description")}
              value={data.description}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="title" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              id="title"
              placeholder="Enter your title here"
              onChange={(e) => handleChange(e, "title")}
              value={data.title}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="videoFile" sm={2}>
            Video File
          </Label>
          <Col sm={10}>
            <Input
              type="file"
              accept="video/*"
              id="videoFile"
              onChange={handleFileChange}
            />
          </Col>
        </FormGroup>

        <Container className="text-center">
          <Button color="success" outline type="submit">
            Upload
          </Button>
          <Button
            color="dark"
            type="reset"
            className="ml-4"
            outline
            onClick={() => setdata({ description: "", title: "" })}
          >
            Reset
          </Button>
        </Container>
      </Form>
    </div>
  );
};

export default Addcontent;
