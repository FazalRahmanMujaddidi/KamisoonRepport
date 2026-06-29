import { useEffect, useState } from "react";
import Select from "react-select";
function Report() {
    // const API = "http://localhost:5047/api/report";
  const API = "/api/report";
    const [reports, setReports] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [items, setItems] = useState([]);
    const [truckTypes, setTruckTypes] = useState([]);

    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        companyId: "",
        provinceId: "",
        itemId: "",
        truckTypeId: "",
        quantity: "",
        reportDate: ""
    });

    const loadReports = () => {
        fetch(API)
            .then(res => res.json())
            .then(data => setReports(data));
    };

    const loadDropdowns = () => {
        // fetch("http://localhost:5047/api/company").then(r => r.json()).then(setCompanies);
        // fetch("http://localhost:5047/api/province").then(r => r.json()).then(setProvinces);
        // fetch("http://localhost:5047/api/items").then(r => r.json()).then(setItems);
        // fetch("http://localhost:5047/api/trucktype").then(r => r.json()).then(setTruckTypes);
         fetch("/api/company").then(r => r.json()).then(setCompanies);
        fetch("/api/province").then(r => r.json()).then(setProvinces);
        fetch("/api/items").then(r => r.json()).then(setItems);
        fetch("/api/trucktype").then(r => r.json()).then(setTruckTypes);
    };

    useEffect(() => {
        loadReports();
        loadDropdowns();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveReport = () => {
        const payload = {
            ...form,
            companyId: Number(form.companyId),
            provinceId: Number(form.provinceId),
            itemId: Number(form.itemId),
            truckTypeId: Number(form.truckTypeId),
            quantity: Number(form.quantity)
        };

        if (editId === null) {
            fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).then(loadReports);
        } else {
            fetch(`${API}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).then(() => {
                setEditId(null);
                loadReports();
            });
        }

        setForm({
            companyId: "",
            provinceId: "",
            itemId: "",
            truckTypeId: "",
            quantity: "",
            reportDate: ""
        });
    };

    const deleteReport = (id) => {
        fetch(`${API}/${id}`, {
            method: "DELETE"
        }).then(loadReports);
    };
    const editReport = async (r) => {
        console.log("EDIT ROW:", r);

        if (!r.id) {
            alert("ID is missing from API response");
            return;
        }

       // const res = await fetch(`http://localhost:5047/api/report/${r.id}`);
         const res = await fetch(`/api/report/${r.id}`);
        const data = await res.json();

        setEditId(data.id);

        setForm({
            companyId: data.companyId,
            provinceId: data.provinceId,
            itemId: data.itemId,
            truckTypeId: data.truckTypeId,
            quantity: data.quantity,
            reportDate: data.reportDate?.split("T")[0]
        });
    };

    return (
        <div className="container py-4">
<div className="sticky-top bg-white shadow-sm p-3 z-3">
            {/* HEADER */}
            <div className="text-center mb-4 mt-5">
                <h3 className="fw-bold">📊 د بار انتقال راپور سیستم</h3>
                <p className="text-muted">د شرکتونو د بارونو مدیریت په اسانه ډول</p>
            </div>

            {/* ================= FORM ================= */}

                <div className="row g-3">

                    {/* ROW 1 */}
                    <div className="col-12 col-md-4">
                        <label className="form-label">شرکت</label>
                        <Select
                            options={companies.map(c => ({
                                value: c.id,
                                label: c.name
                            }))}
                            value={companies
                                .map(c => ({ value: c.id, label: c.name }))
                                .find(x => x.value === form.companyId) || null
                            }
                            onChange={(selected) =>
                                setForm({ ...form, companyId: selected?.value || "" })
                            }
                            placeholder="شرکت انتخاب کړئ"
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">ولایت</label>
                        <Select
                            options={provinces.map(p => ({
                                value: p.id,
                                label: p.name
                            }))}
                            value={provinces
                                .map(p => ({ value: p.id, label: p.name }))
                                .find(x => x.value === form.provinceId) || null
                            }
                            onChange={(selected) =>
                                setForm({ ...form, provinceId: selected?.value || "" })
                            }
                            placeholder="ولایت انتخاب کړئ"
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">جنس</label>
                        <Select
                            options={items.map(i => ({
                                value: i.id,
                                label: i.name
                            }))}
                            value={items
                                .map(i => ({ value: i.id, label: i.name }))
                                .find(x => x.value === form.itemId) || null
                            }
                            onChange={(selected) =>
                                setForm({ ...form, itemId: selected?.value || "" })
                            }
                            placeholder="جنس انتخاب کړئ"
                        />
                    </div>

                    {/* ROW 2 */}
                    <div className="col-12 col-md-4">
                        <label className="form-label">واسطه ډول</label>
                        <select
                            name="truckTypeId"
                            className="form-select"
                            value={form.truckTypeId}
                            onChange={handleChange}
                        >
                            <option value="">انتخاب واسطه</option>
                            {truckTypes.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">مقدار</label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={form.quantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">تاریخ</label>
                        <input
                            type="date"
                            name="reportDate"
                            className="form-control"
                            value={form.reportDate}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                {/* BUTTON */}
                <div className="mt-4 d-flex justify-content-end">
                    <button
                        className={`btn px-4 ${editId ? "btn-warning" : "btn-primary"}`}
                        onClick={saveReport}
                    >
                        {editId ? " تغیراتو ذخیره✏️" : " ذخیره➕"}
                    </button>
                </div>

            </div>

            {/* TABLE */}
            <div className="card shadow-sm">

                <div className="card-header bg-dark text-white">
                    لیست
                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light sticky-thead">
                            <tr>
                                <th>ایدی</th>
                                <th>شرکت نوم</th>
                                <th>ولایت</th>
                                <th>جنس</th>
                                <th>کوچنی لاری</th>
                                <th>غټی لاری</th>
                                <th>مقدار</th>
                                <th>تاریخ</th>
                                <th>عملیه</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reports.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-muted">
                                        دیتا پیدا نشوه
                                    </td>
                                </tr>
                            ) : (
                                reports.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.id}</td>
                                        <td>{r.companyName}</td>
                                        <td>{r.provinceName}</td>
                                        <td>{r.itemName}</td>

                                        <td>{r.smallTruckCount}</td>
                                        <td>{r.bigTruckCount}</td>
                                        <td>{r.totalQuantity}</td>
                                        <td>{r.reportDateShamsi}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-1"
                                                onClick={() => editReport(r)}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteReport(r.id)}
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Report;