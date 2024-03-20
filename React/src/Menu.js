import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Menus = () => {
    return (
        <div>
    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="A" to="/Home" action>Home</Link>
    </ListGroup>

<ListGroup>
<Link className="list-group-item list-group-item-action" tag="A" to="/addcourse" action>Add Course</Link>
</ListGroup>

<ListGroup>
      <Link className="list-group-item list-group-item-action" tag="A" to="/viewcourse" action>My Courses</Link>
    </ListGroup>

    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="A" to="/students" action>My Students</Link>
    </ListGroup>
    </div>
    );
}

export default Menus;