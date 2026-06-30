import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

import DatePickerModule from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePicker = DatePickerModule.default;

const CompanyReport = () => {
    const [data, setData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [companyId, setCompanyId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    // 🔵 LOAD COMPANIES
    useEffect(() => {
        axios.get("http://localhost:5047/api/company")
            .then(res => setCompanies(res.data));
    }, []);

    // 🔵 LOAD REPORT
const fetchReport = async () => {
    setLoading(true);

    try {
        const res = await axios.get(
            "http://localhost:5047/api/report/company-report",
            {
                params: {
                    ...(companyId ? { companyId: Number(companyId) } : {}),
                    ...(selectedDate ? { month: selectedDate.month.number } : {}),
                    ...(selectedDate ? { year: selectedDate.year } : {})
                }
            }
        );

        setData(res.data);
    } catch (err) {
        console.log("API ERROR:", err.response?.data || err.message);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchReport();
        }, 300);

        return () => clearTimeout(timer);
    }, [companyId, selectedDate]);

    // 🔵 EXPORT
    const downloadExcel = () => {
        const params = new URLSearchParams({
            companyId: companyId || "",
            month: selectedDate?.month?.number || "",
            year: selectedDate?.year || ""
        });

        window.open(
            `http://localhost:5047/api/report/export-excel?${params.toString()}`,
            "_blank"
        );
    };

    return (
        <div className="page">

            {/* HEADER */}
            <div className="sticky-header">

                <div className="text-center mt-4">
                    <h2>📊 د شرکتونو راپور</h2>
                    <p>فلټر شوی راپور سیستم</p>
                </div>

                {/* FILTERS */}
                <div className="filters">

                    {/* COMPANY */}
                    <Select
                        options={companies.map(c => ({
                            value: c.id,
                            label: c.name
                        }))}
                        value={
                            companies
                                .map(c => ({ value: c.id, label: c.name }))
                                .find(x => x.value === companyId) || null
                        }
                        onChange={(selected) =>
                            setCompanyId(selected?.value || "")
                        }
                        placeholder="شرکت انتخاب کړئ"
                    />

                    {/* DATE PICKER */}
                    <DatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY/MM/DD"
                        inputClass="form-control"
                        placeholder="تاریخ انتخاب کړئ"
                    />

                    {/* RESET */}
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            setCompanyId("");
                            setSelectedDate(null);
                        }}
                    >
                        Reset
                    </button>

                    {/* EXPORT */}
                    <button
                        className="btn btn-success"
                        onClick={downloadExcel}
                    >
                        📥 Export
                    </button>

                </div>
            </div>

            {/* TABLE */}
            <div className="tableContainer">

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <table>

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>شرکت</th>
                                <th>ولایت</th>
                                <th>کوچنی لاری</th>
                                <th>غټی لاری</th>
                                <th>جنس</th>
                                <th>مقدار</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                        معلومات نشته
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.companyName}</td>
                                        <td>{item.provinceName}</td>
                                        <td>{item.smallTruckTotal}</td>
                                        <td>{item.bigTruckTotal}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.totalQuantity}</td>
                                        <td>{item.reportDateShamsi}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                )}

            </div>

            {/* STYLE */}
            <style>{`
                .page {
                    font-family: Arial;
                    padding: 20px;
                }

                .sticky-header {
                    position: sticky;
                    top: 0;
                    background: white;
                    z-index: 1000;
                    padding: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .filters {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-top: 10px;
                }

                .tableContainer {
                    margin-top: 20px;
                    max-height: 70vh;
                    overflow: auto;
                    border: 1px solid #ddd;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                thead th {
                    position: sticky;
                    top: 0;
                    background: #0d6efd;
                    color: white;
                    padding: 10px;
                }

                td {
                    padding: 10px;
                    text-align: center;
                    border-bottom: 1px solid #eee;
                }

                tr:hover {
                    background: #f8f9fa;
                }

                @media (max-width: 768px) {
                    .filters {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

        </div>
    );
};

export default CompanyReport;