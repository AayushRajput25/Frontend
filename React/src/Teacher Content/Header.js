import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import Sidebar from "./Sidebar.js"
const ContentHeader = (props) => {
return(
    <div>
        
        <Card className="text-center">
        <CardBody>
        <h1> Welcome {props.name}!</h1>
        <h3> Your Contents for {props.contents} </h3>
        </CardBody>
        </Card>

    </div>
);
}

export default ContentHeader;