import { useEffect, useState } from "react";

function Province() {
  const [provinces, setProvinces] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const API = "https://localhost:5047/api/province"; // CHANGE PORT if needed

  const loadData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setProvinces(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addProvince = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name})
    }).then(() => {
      setName("");
      loadData();
    });
  };

  const deleteProvince = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => loadData());
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-3">Province Management</h3>

      {/* FORM */}
      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Province Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addProvince}>
          Add Province
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
          {provinces.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProvince(p.id)}
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

export default Province;