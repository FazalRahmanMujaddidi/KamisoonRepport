import { useEffect, useState } from "react";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");

  const API = "https://localhost:5047/api/company"; // change port if needed

  const loadData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setCompanies(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCompany = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");
      loadData();
    });
  };

  const deleteCompany = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => loadData());
  };

  return (
    <div className="container mt-4">

      <h3>Company Management</h3>

      {/* FORM */}
      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addCompany}>
          Add Company
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCompany(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Company;