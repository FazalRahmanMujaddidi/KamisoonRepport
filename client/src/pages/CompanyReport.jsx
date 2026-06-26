// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import axios from "axios";

// const months = [
//     { value: 1, name: "حمل" },
//     { value: 2, name: "ثور" },
//     { value: 3, name: "جوزا" },
//     { value: 4, name: "سرطان" },
//     { value: 5, name: "اسد" },
//     { value: 6, name: "سنبله" },
//     { value: 7, name: "میزان" },
//     { value: 8, name: "عقرب" },
//     { value: 9, name: "قوس" },
//     { value: 10, name: "جدی" },
//     { value: 11, name: "دلو" },
//     { value: 12, name: "حوت" }
// ];

// const CompanyReport = () => {
//     const [data, setData] = useState([]);
//     const [companies, setCompanies] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [companyId, setCompanyId] = useState("");
//     const [month, setMonth] = useState("");
//     const [year, setYear] = useState("1405");
//     const downloadExcel = () => {
//         const params = new URLSearchParams({
//             companyId: companyId || "",
//             month: month || "",
//             year: year || ""
//         });

//         window.open(
//             `http://localhost:5047/api/report/export-excel?${params.toString()}`,
//             "_blank"
//         );
//     };
//     useEffect(() => {
//         axios
//             .get("http://localhost:5047/api/company")
//             .then((res) => setCompanies(res.data))
//             .catch((err) => console.log(err));
//     }, []);

//     useEffect(() => {
//         fetchReport();
//     }, [companyId, month, year]);

//     const fetchReport = async () => {
//         setLoading(true);

//         try {
//             const res = await axios.get(
//                 "http://localhost:5047/api/report/company-report",
//                 {
//                     params: {
//                         companyId: companyId || null,
//                         month: month || null,
//                         year: year || null
//                     }
//                 }
//             );

//             setData(res.data);
//         } catch (err) {
//             console.error("Error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="page">
// <div className="sticky-top bg-white shadow-sm p-3 z-3">
//             {/* HEADER */}
//             <div className="header mt-5">
//                 <h2>📊 د شرکتونو راپور</h2>
//                 <p>د شرکتونو، ولایتونو او جنسونو د انتقالاتو راپور</p>
//             </div>

//             {/* FILTERS */}
//             <div className="filters">
//                 <Select
//                     options={companies.map(c => ({
//                         value: c.id,
//                         label: c.name
//                     }))}
//                     value={
//                         companies
//                             .map(c => ({ value: c.id, label: c.name }))
//                             .find(x => x.value === companyId) || null
//                     }
//                     onChange={(selected) => setCompanyId(selected?.value || "")}
//                     placeholder="ټول شرکتونه"
//                 />

//                 {/* Month */}
//                 <select
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                 >
//                     <option value="">ټولې میاشتې</option>

//                     {months.map((m) => (
//                         <option key={m.value} value={m.value}>
//                             {m.name}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Year */}
//                 <select
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                 >
//                     <option value="">ټول کلونه</option>
//                     <option value="1403">1403</option>
//                     <option value="1404">1404</option>
//                     <option value="1405">1405</option>
//                     <option value="1406">1406</option>
//                 </select>

//                 {/* Reset */}
//                 <button
//                     className="resetBtn"
//                     onClick={() => {
//                         setCompanyId("");
//                         setMonth("");
//                         setYear("");
//                     }}
//                 >
//                     له سره پیل
//                 </button>
//                 <button className="btn btn-success btn-sm" onClick={downloadExcel}>
//                     📥 دانلود
//                 </button>
//             </div>
// </div>
//             {/* TABLE */}
//             <div className="tableContainer">

//                 {loading ? (
//                     <div className="loading">
//                         <h4>معلومات را اخیستل کیږي...</h4>
//                     </div>
//                 ) : (
//                     <table>

//                     <thead className="sticky-thead">
//                             <tr>
//                                 <th>شرکت</th>
//                                 <th>ولایت</th>
//                                 <th>کوچنی لاری</th>
//                                 <th>غټی لاری</th>
//                                 <th>جنس</th>
//                                 <th>ټول مقدار</th>
//                                  <th>تاریخ</th>
//                             </tr>
//                         </thead>

//                         <tbody>

//                             {data.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="4" className="empty">
//                                         معلومات ونه موندل شول
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 data.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{item.companyName}</td>
//                                         <td>{item.provinceName}</td>
//                                         <td>{item.smallTruckTotal}</td>
//                                         <td>{item.bigTruckTotal}</td>
//                                         <td>{item.itemName}</td>
//                                         <td>{item.totalQuantity}</td>
//                                         <td>{item.reportDateShamsi}</td>
//                                     </tr>
//                                 ))
//                             )}

//                         </tbody>

//                     </table>
//                 )}

//             </div>

//             <style>{`
//         .page {
//           padding: 25px;
//           font-family: Arial, sans-serif;
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 25px;
//         }

//         .header h2 {
//           margin-bottom: 5px;
//           font-weight: bold;
//         }

//         .header p {
//           color: #666;
//         }

//         .filters {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .filters select,
//         .resetBtn {
//           padding: 10px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           font-size: 14px;
//         }

//         .filters select:focus {
//           outline: none;
//           border-color: #0d6efd;
//         }

//         .resetBtn {
//           background: #dc3545;
//           color: white;
//           border: none;
//           cursor: pointer;
//           font-weight: bold;
//         }

//         .resetBtn:hover {
//           background: #bb2d3b;
//         }

//         .tableContainer {
//           background: white;
//           border-radius: 10px;
//           overflow-x: auto;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         th {
//           background: #0d6efd;
//           color: white;
//           padding: 12px;
//           text-align: center;
//         }

//         td {
//           padding: 12px;
//           border-bottom: 1px solid #eee;
//           text-align: center;
//         }

//         tr:hover {
//           background: #f8f9fa;
//         }

//         .loading,
//         .empty {
//           text-align: center;
//           padding: 20px;
//         }

//         @media (max-width: 768px) {
//           .filters {
//             grid-template-columns: 1fr;
//           }

//           .page {
//             padding: 10px;
//           }

//           table {
//             min-width: 600px;
//           }

//           .header h2 {
//             font-size: 20px;
//           }
//         }
//       `}</style>

//         </div>
//     );
// };

// export default CompanyReport;
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const months = [
    { value: 1, name: "حمل" },
    { value: 2, name: "ثور" },
    { value: 3, name: "جوزا" },
    { value: 4, name: "سرطان" },
    { value: 5, name: "اسد" },
    { value: 6, name: "سنبله" },
    { value: 7, name: "میزان" },
    { value: 8, name: "عقرب" },
    { value: 9, name: "قوس" },
    { value: 10, name: "جدی" },
    { value: 11, name: "دلو" },
    { value: 12, name: "حوت" }
];

const CompanyReport = () => {
    const [data, setData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [companyId, setCompanyId] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("1405");

    const downloadExcel = () => {
        const params = new URLSearchParams({
            companyId: companyId || "",
            month: month || "",
            year: year || ""
        });

        window.open(
            `http://localhost:5047/api/report/export-excel?${params.toString()}`,
            "_blank"
        );
    };

    useEffect(() => {
        axios.get("http://localhost:5047/api/company")
            .then((res) => setCompanies(res.data));
    }, []);

    useEffect(() => {
        fetchReport();
    }, [companyId, month, year]);

    const fetchReport = async () => {
        setLoading(true);

        try {
            const res = await axios.get(
                "http://localhost:5047/api/report/company-report",
                {
                    params: {
                        companyId: companyId || null,
                        month: month || null,
                        year: year || null
                    }
                }
            );

            setData(res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">

            {/* 🔵 STICKY TOP BAR (FILTERS) */}
            <div className="sticky-header">

                <div className="header text-center mt-5">
                    <h2>📊 د شرکتونو راپور</h2>
                    <p>د شرکتونو، ولایتونو او جنسونو د انتقالاتو راپور</p>
                </div>

                <div className="filters">
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
                        placeholder="ټول شرکتونه"
                    />

                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">ټولې میاشتې</option>
                        {months.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="">ټول کلونه</option>
                        <option value="1403">1403</option>
                        <option value="1404">1404</option>
                        <option value="1405">1405</option>
                        <option value="1406">1406</option>
                    </select>

                    <button
                        className="resetBtn btn btn-danger"
                        onClick={() => {
                            setCompanyId("");
                            setMonth("");
                            setYear("");
                        }}
                    >
                        له سره پیل
                    </button>

                    <button className="btn btn-success btn-sm" onClick={downloadExcel}>
                        📥 دانلود
                    </button>
                </div>
            </div>

            {/* 🟢 TABLE */}
            <div className="tableContainer">

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <table>

                        <thead>
                            <tr>
                                <th>شرکت</th>
                                <th>ولایت</th>
                                <th>کوچنی لاری</th>
                                <th>غټی لاری</th>
                                <th>جنس</th>
                                <th>ټول مقدار</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.companyName}</td>
                                    <td>{item.provinceName}</td>
                                    <td>{item.smallTruckTotal}</td>
                                    <td>{item.bigTruckTotal}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.totalQuantity}</td>
                                    <td>{item.reportDateShamsi}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}

            </div>

            {/* ✅ CSS */}
            <style>{`
                .page {
                    font-family: Arial;
                    padding: 20px;
                }

                /* 🔵 sticky header (filters) */
                .sticky-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: white;
                    padding: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .filters {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                }

                .filters select,
                .resetBtn {
                    padding: 8px;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                }

                /* 🟢 TABLE WRAPPER SCROLL */
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

                /* 🔥 STICKY HEADER FIX */
                thead th {
                    position: sticky;
                    top: 0;
                    background: #0d6efd;
                    color: white;
                    z-index: 5;
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