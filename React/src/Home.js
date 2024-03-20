import React from "react";
import { Button } from "reactstrap";
import { useEffect } from "react";
const Home = () => {

  useEffect(() => {
    document.title = "Home"
}, []);
  
    return (
      <div>
<br/><br/>
<h1 className="text-center display-5">Welcome to E-Learning Website</h1>
<div className="text-center"><p1>This is Developed by Sunbeam Members</p1>
<br/><br/>
<Button color="primary" outline>Start Learning</Button>
<br/>
</div>

    </div>
    )
  };
  
  export default Home;
  