import { useEffect, useState } from "react";

function TruckType() {
  const [truckTypes, setTruckTypes] = useState([]);
  const [name, setName] = useState("");

  const API = "https://localhost:5047/api/trucktype"; // change port if needed

  const loadData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTruckTypes(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTruckType = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");
      loadData();
    });
  };

  const deleteTruckType = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => loadData());
  };

  return (
    <div className="container mt-4">

      <h3>Truck Type Management</h3>

      {/* FORM */}
      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Truck Type Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addTruckType}>
          Add Truck Type
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
          {truckTypes.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTruckType(t.id)}
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

export default TruckType;