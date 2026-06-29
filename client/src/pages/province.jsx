import { useEffect, useState } from "react";
function Province() {
  const [provinces, setProvinces] = useState([]);
  const [name, setName] = useState("");
 const [date, setDate] = useState("");

  const API = "http://localhost:5047/api/province";

  const loadData = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addProvince = () => {
    if (!name.trim()) return;

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name
      }),
    }).then(() => {
      setName("");
      loadData();
    });
  };

  const deleteProvince = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => loadData());
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="text-center mb-4 mt-5">
        <h3 className="fw-bold">🗺 د ولایتونو مدیریت</h3>
        <p className="text-muted">ټول ولایتونه په اسانۍ سره مدیریت کړئ</p>
      </div>

      {/* FORM */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-2 align-items-center">

          {/* NAME */}
          <div className="col-12 col-md-12">
            <input
              className="form-control"
              placeholder="د ولایت نوم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* BUTTON */}
          <div className="col-12 col-md-3 d-grid">
            <button className="btn btn-primary" onClick={addProvince}>
              ➕ ذخیره
            </button>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          د ولایتونو لیست
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>شمېره</th>
                <th>د ولایت نوم</th>
                <th style={{ width: "120px" }}>عمل</th>
              </tr>
            </thead>

            <tbody>
              {provinces.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    هیڅ ولایت ونه موندل شو
                  </td>
                </tr>
              ) : (
                provinces.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td className="fw-semibold">{p.name}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => deleteProvince(p.id)}
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

      {/* MOBILE STYLE */}
      <style>{`
        @media (max-width: 576px) {
          h3 { font-size: 18px; }
          .btn { font-size: 14px; }
          table { font-size: 14px; }
        }
      `}</style>

    </div>
  );
}

export default Province;