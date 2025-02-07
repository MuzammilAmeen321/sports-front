import React, { useState } from "react";

const MatchesManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "" });

  const toggleSelectAll = (e) => {
    setSelectedEmployees(e.target.checked ? employees.map(emp => emp.id) : []);
  };

  const toggleSelect = (id) => {
    setSelectedEmployees(selectedEmployees.includes(id)
      ? selectedEmployees.filter(empId => empId !== id)
      : [...selectedEmployees, id]);
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    setNewEmployee({ name: "", email: "", role: "" });
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title   p-3 d-flex justify-content-between">
          <h2>My Team <b>Members</b></h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus"></i> <span>Add Employee</span>
          </button>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={toggleSelectAll} /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <input type="checkbox" checked={selectedEmployees.includes(emp.id)} onChange={() => toggleSelect(emp.id)} />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  <a href="#" className="edit "><i className="fa fa-pencil"></i></a>
                  <a href="#" className="delete "><i className="fa fa-trash"></i></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <input type="text" placeholder="Name" className="form-control mb-2" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                <input type="email" placeholder="Email" className="form-control mb-2" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                <input type="text" placeholder="Role" className="form-control" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddEmployee}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesManagement;