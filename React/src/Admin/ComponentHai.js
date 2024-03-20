import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComponentHai = ({ title, count }) => {
  return (
    <div className="col-md-6">
      <div className="card p-3 shadow gradient-background"> {/* Apply gradient background class */}
        <h2 className="title">{title}</h2> {/* Apply title class */}
        <h3 className="count">{count}</h3> {/* Apply count class */}
      </div>
    </div>
  );
}

export default ComponentHai;
