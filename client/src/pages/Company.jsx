import { useEffect, useState } from "react";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");

  const API = "http://localhost:5047/api/company";
  const loadData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setCompanies(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCompany = () => {
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

  const deleteCompany = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => loadData());
  };

  return (
    <div className="container py-4 ">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-4 mt-5 ">
        <h3 className="fw-bold">🏢 د شرکت مدیریت</h3>
        <p className="text-muted">ټولې شرکتونه په اسانۍ سره مدیریت کړئ</p>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-2">
          {/* Input */}
          <div className="col-12">
            <input
              className="form-control form-control-lg"
              placeholder="د شرکت نوم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Button below */}
          <div className="col-12">
            <div className="row">
              <div className="col-md-3">
                <button
                  className="btn btn-primary w-100 btn-lg"
                  onClick={addCompany}
                >
                  ➕ ذخیره
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card shadow-sm">

        <div className="card-header bg-dark text-white">
          د شرکتونو لیست
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>شمېره</th>
                <th>د شرکت نوم</th>
                <th style={{ width: "120px" }}>عمل</th>
              </tr>
            </thead>

            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    هیڅ شرکت ونه موندل شو
                  </td>
                </tr>
              ) : (
                companies.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td className="fw-semibold">{c.name}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => deleteCompany(c.id)}
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

      {/* ================= MOBILE IMPROVEMENT ================= */}
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

export default Company;