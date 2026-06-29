import DatePickerModule from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
const DatePicker = DatePickerModule.default;
import Select from "react-select";
function Report() {
    const API = "http://localhost:5047/api/report";
    // const API = "/api/report";
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
        // reportDate: ""
        reportDate: null
    });
    const afghanLocale = {
        ...persian_fa,
        months: [
            ["حمل", "حم"],
            ["ثور", "ثو"],
            ["جوزا", "جو"],
            ["سرطان", "سر"],
            ["اسد", "اسد"],
            ["سنبله", "سن"],
            ["میزان", "می"],
            ["عقرب", "عق"],
            ["قوس", "قو"],
            ["جدی", "جد"],
            ["دلو", "دل"],
            ["حوت", "حو"],
        ],
    };
    const loadReports = () => {
        fetch(API)
            .then(res => res.json())
            .then(data => setReports(data));
    };

    const loadDropdowns = () => {
        fetch("http://localhost:5047/api/company").then(r => r.json()).then(setCompanies);
        fetch("http://localhost:5047/api/province").then(r => r.json()).then(setProvinces);
        fetch("http://localhost:5047/api/items").then(r => r.json()).then(setItems);
        fetch("http://localhost:5047/api/trucktype").then(r => r.json()).then(setTruckTypes);
        //  fetch("/api/company").then(r => r.json()).then(setCompanies);
        // fetch("/api/province").then(r => r.json()).then(setProvinces);
        // fetch("/api/items").then(r => r.json()).then(setItems);
        // fetch("/api/trucktype").then(r => r.json()).then(setTruckTypes);
    };

    useEffect(() => {
        loadReports();
        loadDropdowns();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveReport = () => {
        const dateValue =
    typeof form.reportDate === "string"
        ? form.reportDate
        : form.reportDate?.format?.("YYYY/MM/DD");

console.log("DATE VALUE:", dateValue);
    if (!form.reportDate) {
        alert("Please select date");
        return;
    }

    const payload = {
        companyId: Number(form.companyId),
        provinceId: Number(form.provinceId),
        itemId: Number(form.itemId),
        truckTypeId: Number(form.truckTypeId),
        quantity: Number(form.quantity),
        DateS: form.reportDate.format("YYYY/MM/DD")
    };

    const isEdit = editId !== null;

    const url = isEdit ? `${API}/${editId}` : API;
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
    })
    .then(() => {
        loadReports();

        // IMPORTANT RESET
        setEditId(null);

        setForm({
            companyId: "",
            provinceId: "",
            itemId: "",
            truckTypeId: "",
            quantity: "",
            reportDate: null
        });
    })
    .catch(err => console.log(err));
};
// const editReport = async (r) => {
//     console.log("ROW DATA:", r);
// };
const editReport = (r) => {
  console.log("EDIT RECORD:", r);

  const truckTypeId =
    r.smallTruckCount > 0 ? 1 :
    r.bigTruckCount > 0 ? 2 : "";

  setEditId(1); // temporary test

  setForm({
    companyId: r.companyId,
    provinceId: r.provinceId,
    itemId: r.itemId,
    truckTypeId,
    quantity: r.totalQuantity,
    reportDate: r.dateS
  });

  console.log("FORM SET");
};
    return (
        <div className="container py-4 mt-5">
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
                            className="form-control-lg"
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
                            className="form-control-lg"
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
                            className="form-control-lg"
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">واسطه ډول</label>

                        <Select
                            options={truckTypes.map(t => ({
                                value: t.id,
                                label: t.name
                            }))}
                            value={
                                truckTypes
                                    .map(t => ({
                                        value: t.id,
                                        label: t.name
                                    }))
                                    .find(x => x.value === form.truckTypeId) || null
                            }
                            onChange={(selected) =>
                                setForm({
                                    ...form,
                                    truckTypeId: selected?.value || ""
                                })
                            }
                            placeholder="انتخاب واسطه"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: "48px"
                                })
                            }}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">مقدار</label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control form-control-lg"
                            value={form.quantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label">تاریخ</label><br />
                        <DatePicker
                            value={form.reportDate}
                            onChange={(value) =>
                                setForm({ ...form, reportDate: value })
                            }
                            calendar={persian}
                            locale={afghanLocale}
                            format="YYYY/MM/DD"
                            placeholder="تاریخ انتخاب کړئ"
                            inputClass="form-control form-control-lg w-150"
                        />

                    </div>

                </div>

                {/* BUTTON */}
                <div className="mt-4 d-flex justify-content-end">
                    <button
                        type="button"
                        className={`btn px-4 ${editId !== null ? "btn-warning" : "btn-primary"} form-control-lg`}
                        onClick={saveReport}
                    >
                        {editId !== null ? " تغیراتو ذخیره✏️" : " ذخیره➕"}
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
                                        <td>{r.dateS || r.DateS}</td>
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