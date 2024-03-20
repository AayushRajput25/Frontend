import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPanelash() {
  return (
    <div className="container mt-4">
      <div className="card p-3 shadow">
        <h2 className="mb-3 text-center">Admin Panel</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Manage Users</h5>
                <p className="card-text">Add, edit, or delete users.</p>
                <Link to="/users" className="btn btn-primary">Go to Users</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Manage Courses</h5>
                <p className="card-text">Add, edit, or delete courses.</p>
                <Link to="/courses" className="btn btn-primary">Go to Courses</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Analytics</h5>
                <p className="card-text">View data analytics and reports.</p>
                <Link to="/analytics" className="btn btn-primary">Go to Analytics</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Settings</h5>
                <p className="card-text">Manage system settings.</p>
                <Link to="/settings" className="btn btn-primary">Go to Settings</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelash;
