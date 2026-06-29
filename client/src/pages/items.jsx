import { useEffect, useState } from "react";

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  // const API = "http://localhost:5047/api/items";
    const API = "/api/items";

  const loadData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setItems(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = () => {
    if (!name.trim()) return;

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
    <div className="container py-4">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-4 mt-5">
        <h3 className="fw-bold">📦 د توکو مدیریت</h3>
        <p className="text-muted">ټول توکي / اجناس په اسانۍ سره مدیریت کړئ</p>
      </div>

      {/* ================= FORM ================= */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-2 align-items-center">

          <div className="col-12 col-md-9">
            <input
              className="form-control"
              placeholder="د جنس نوم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3 d-grid">
            <button
              className="btn btn-primary"
              onClick={addItem}
            >
              ➕ ذخیره
            </button>
          </div>

        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card shadow-sm">

        <div className="card-header bg-dark text-white">
          د توکو لیست
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>شمېره</th>
                <th>د جنس نوم</th>
                <th style={{ width: "120px" }}>عمل</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    هېڅ توکي ونه موندل شول
                  </td>
                </tr>
              ) : (
                items.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td className="fw-semibold">{i.name}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => deleteItem(i.id)}
                      >
                        🗑 حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>

      {/* ================= MOBILE CSS ================= */}
      <style>{`
        @media (max-width: 576px) {
          h3 {
            font-size: 18px;
          }

          .btn {
            font-size: 14px;
          }

          table {
            font-size: 14px;
          }
        }
      `}</style>

    </div>
  );
}

export default Items;