import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const MenuSign = () => {
    return (
        <div>
    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="A" to="/" action>Home</Link>
    </ListGroup>

<ListGroup>
<Link className="list-group-item list-group-item-action" tag="A" to="/SignIn" action>SignIn</Link>
</ListGroup>

<ListGroup>
      <Link className="list-group-item list-group-item-action" tag="A" to="/TeacherSignup" action>TeacherSignUp</Link>
    </ListGroup>

    <ListGroup>
      <Link className="list-group-item list-group-item-action" tag="A" to="/StudentSignup" action>StudentSignUp</Link>
    </ListGroup>
    </div>
    );
}

export default MenuSign;