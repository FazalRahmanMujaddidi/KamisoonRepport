import { useEffect, useState } from "react";

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const API = "https://localhost:5047/api/item"; // change port if needed

  const loadData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setItems(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = () => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");
      loadData();
    });
  };

  const deleteItem = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => loadData());
  };

  return (
    <div className="container mt-4">

      <h3>Items Management</h3>

      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(i.id)}
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

export default Items;