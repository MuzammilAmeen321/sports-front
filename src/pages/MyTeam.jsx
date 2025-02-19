import React, { useState } from "react";

const MatchesManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Babar Azam",
      email: "babar@pcb.com.pk",
      role: "Captain",
      image: "https://www.cricketcountry.com/wp-content/uploads/2024/02/Babar-Azam-1.jpg",
      team: "Pakistan",
      stats: { runs: 5000, matches: 100 },
    },
    {
      id: 2,
      name: "Shaheen Afridi",
      email: "shaheen@pcb.com.pk",
      role: "Bowler",
      image: "https://i.aaj.tv/primary/2024/07/11171346c8b4b89.webp",
      team: "Pakistan",
      stats: { wickets: 200, matches: 60 },
    },
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "", image: "", team: "", stats: { runs: 0, wickets: 0, matches: 0 } });

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
    setNewEmployee({ name: "", email: "", role: "", image: "", team: "", stats: { runs: 0, wickets: 0, matches: 0 } });
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title p-3 d-flex justify-content-between">
          <h2>My Team <b>Members</b></h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            <i className="fa fa-plus"></i> <span>Add Employee</span>
          </button>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "5%", textAlign: "center" }}><input type="checkbox" onChange={toggleSelectAll} /></th>
              <th style={{ width: "10%", textAlign: "center" }}>Image</th>
              <th style={{ width: "35%" }}>Details</th>
              <th style={{ width: "10%", textAlign: "center" }}>Role</th>
              <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input type="checkbox" checked={selectedEmployees.includes(emp.id)} onChange={() => toggleSelect(emp.id)} />
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <img src={emp.image} alt={emp.name} className="img-thumbnail" style={{ width: "80px", height: "80px", borderRadius: "0" }} />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <strong>{emp.name}</strong><br />
                  <small>{emp.email}</small><br />
                  <small><strong>Team:</strong> {emp.team}</small><br />
                  <small><strong>Matches Played:</strong> {emp.stats.matches}</small><br />
                  {emp.stats.runs && <small><strong>Runs:</strong> {emp.stats.runs}</small>} 
                  {emp.stats.wickets && <small><strong>Wickets:</strong> {emp.stats.wickets}</small>}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{emp.role}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <a href="#" className="edit"><i className="fa fa-pencil"></i></a>
                  <span> / </span>
                  <a href="#" className="delete"><i className="fa fa-trash"></i></a>
                  <span> / </span>
                  <a href="#" className="view"><i className="fa fa-eye"></i></a> {/* View Icon */}
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
                <input type="text" placeholder="Image URL" className="form-control mb-2" value={newEmployee.image} onChange={(e) => setNewEmployee({ ...newEmployee, image: e.target.value })} />
                <input type="text" placeholder="Name" className="form-control mb-2" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                <input type="email" placeholder="Email" className="form-control mb-2" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                <input type="text" placeholder="Role" className="form-control mb-2" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} />
                <input type="text" placeholder="Team" className="form-control mb-2" value={newEmployee.team} onChange={(e) => setNewEmployee({ ...newEmployee, team: e.target.value })} />
                <input type="number" placeholder="Matches Played" className="form-control mb-2" value={newEmployee.stats.matches} onChange={(e) => setNewEmployee({ ...newEmployee, stats: { ...newEmployee.stats, matches: e.target.value } })} />
                <input type="number" placeholder="Runs (if applicable)" className="form-control mb-2" value={newEmployee.stats.runs} onChange={(e) => setNewEmployee({ ...newEmployee, stats: { ...newEmployee.stats, runs: e.target.value } })} />
                <input type="number" placeholder="Wickets (if applicable)" className="form-control" value={newEmployee.stats.wickets} onChange={(e) => setNewEmployee({ ...newEmployee, stats: { ...newEmployee.stats, wickets: e.target.value } })} />
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
