import MainLayout from "../components/layouts/MainLayout";
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { encryptRequest, decryptResponse } from "../utils/encryption";

export default function Users() {
    return (
        <MainLayout>
            <div className="container-fluid pt-3">
                <UserRequestForm />
            </div>
        </MainLayout>
    );
}

/* ---------------- HELPERS ---------------- */
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
};

const getTodayDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
};

// Helper to map Username prefixes to the required Role strings
const mapUsernameToRole = (username) => {
    const upper = username.toUpperCase();
    if (upper.startsWith("CBCM")) return "CBC Maker";
    if (upper.startsWith("CBC")) return "CBC";
    if (upper.startsWith("MDS")) return "Master Distributor";
    if (upper.startsWith("DS")) return "Distributor";
    if (upper.startsWith("AG")) return "Agent";
    return "ALL";
};

/* ---------------- COMPONENT ---------------- */
const UserRequestForm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
        searchType: 'date',
        fromDate: getTodayDate(),
        toDate: getTodayDate(),
        userType: 'ALL',
        status: 'ALL',
        userNameSearch: '' 
    });

    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const floatingLabelBox = {
        position: 'relative',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '8px 12px 4px 12px',
        backgroundColor: '#fff',
        display: 'block',
        width: '100%'
    };

    const floatingLabelText = {
        position: 'absolute',
        top: '-10px',
        left: '10px',
        backgroundColor: '#fff',
        padding: '0 4px',
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#6c757d',
        zIndex: 2,
        pointerEvents: 'none'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "searchType") {
            setTableData([]);
            setHasSearched(false);
            setSubmitted(false);
        }
        if (name === "userNameSearch") setSubmitted(false);

        setFormData(prev => {
            let updated = { ...prev, [name]: value };
            if (name === "fromDate") {
                const today = getTodayDate();
                const max15Days = addDays(value, 14);
                updated.toDate = max15Days > today ? today : max15Days;
            }
            if (name === "toDate") {
                const today = getTodayDate();
                const maxEndDate = addDays(prev.fromDate, 14);
                if (value > maxEndDate) updated.toDate = maxEndDate;
                if (value > today) updated.toDate = today;
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (formData.searchType === 'user' && !formData.userNameSearch.trim()) {
            return;
        }

        setLoading(true);
        setHasSearched(false);

        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("No access token found");

            let finalData = [];

            if (formData.searchType === 'date') {
                // ENCRYPTED API CALL
                const payload = {
                    startDate: formData.fromDate,
                    endDate: formData.toDate,
                    role: formData.userType,
                    status: formData.status,
                    username: user?.userType
                };
                console.log("payload", payload);
                
                const encryptedBody = { RequestData: encryptRequest(payload) };

                const response = await fetch(
                    "https://apidev-sdk.iserveu.online/NSDL/user_onboarding_report/fetch-user-list",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                            pass_key: "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
                        },
                        body: JSON.stringify(encryptedBody)
                    }
                );
                const result = await response.json();
                const decrypted = decryptResponse(result.ResponseData);
                finalData = decrypted?.resultObj?.result || [];

            } else {
                // PLAIN JSON API CALL (Search by Username)
                // const payload = {
                //     searchUsername: formData.userNameSearch,
                //     role: mapUsernameToRole(formData.userNameSearch)
                // };
                // console.log("payload", payload);

                const payload = {
                    // startDate: getTodayDate(),
                    // endDate: getTodayDate(),
                    role: mapUsernameToRole(formData.userNameSearch),
                    // status: "ALL",
                    searchUsername: formData.userNameSearch,
                      //user?.userType
                };
                console.log("payload", payload);
                
                const encryptedBody = { RequestData: encryptRequest(payload) };

                const response = await fetch(
                    "https://apidev-sdk.iserveu.online/NSDL/user_onboarding_report/fetch-user-list",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                            pass_key: "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA"
                        },
                        body: JSON.stringify(encryptedBody)
                    }
                );
                const result = await response.json();
                const decrypted = decryptResponse(result.ResponseData);
                finalData = decrypted?.resultObj?.result || [];
            }
            
            setTableData(finalData);
            setHasSearched(true);
        } catch (error) {
            console.error("API Error:", error);
            alert("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const showUserError = submitted && formData.searchType === 'user' && !formData.userNameSearch.trim();

    return (
        <>
            <div className="card shadow-sm border-0 rounded-3 mb-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="d-flex gap-4 mb-4">
                            <div className="form-check">
                                <input className="form-check-input shadow-none" type="radio" name="searchType" id="dateRadio" value="date" checked={formData.searchType === 'date'} onChange={handleChange} style={{ accentColor: '#821317' }} />
                                <label className="form-check-label small fw-bold" htmlFor="dateRadio">Search by Date Range</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input shadow-none" type="radio" name="searchType" id="userRadio" value="user" checked={formData.searchType === 'user'} onChange={handleChange} style={{ accentColor: '#821317' }} />
                                <label className="form-check-label small fw-bold" htmlFor="userRadio">Search by User Name</label>
                            </div>
                        </div>

                        {formData.searchType === 'date' ? (
                            <div className="row g-3 align-items-end">
                                <div className="col-md-2">
                                    <div style={floatingLabelBox}>
                                        <label style={floatingLabelText}>FROM DATE*</label>
                                        <input type="date" name="fromDate" className="form-control border-0 shadow-none p-0 small bg-transparent" value={formData.fromDate} onChange={handleChange} max={getTodayDate()} required />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div style={floatingLabelBox}>
                                        <label style={floatingLabelText}>TO DATE*</label>
                                        <input type="date" name="toDate" className="form-control border-0 shadow-none p-0 small bg-transparent" value={formData.toDate} onChange={handleChange} min={formData.fromDate} max={addDays(formData.fromDate, 14) > getTodayDate() ? getTodayDate() : addDays(formData.fromDate, 14)} required />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div style={floatingLabelBox}>
                                        <label style={floatingLabelText}>USER TYPE</label>
                                        <select name="userType" className="form-select border-0 shadow-none p-0 mt-1 small bg-transparent" value={formData.userType} onChange={handleChange}>
                                            <option value="ALL">ALL</option>
                                            <option value="CBC">CBC</option>
                                            <option value="CBC Maker">CBC Maker</option>
                                            <option value="Master Distributor">Master Distributor</option>
                                            <option value="Distributor">Distributor</option>
                                            <option value="Agent">Agent</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div style={floatingLabelBox}>
                                        <label style={floatingLabelText}>STATUS</label>
                                        <select name="status" className="form-select border-0 shadow-none p-0 mt-1 small bg-transparent" value={formData.status} onChange={handleChange}>
                                            <option value="ALL">ALL</option>
                                            <option value="APPROVED">APPROVED</option>
                                            <option value="PENDING">PENDING</option>
                                            <option value="REJECTED">REJECTED</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <button type="submit" className="btn w-100 text-white fw-bold py-2 shadow-sm" disabled={loading} style={{ backgroundColor: '#821317', borderRadius: '4px' }}>
                                        {loading ? 'Processing...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="row g-3 align-items-start">
                                <div className="col-md-5">
                                    <div style={{ ...floatingLabelBox, borderColor: showUserError ? '#e55353' : '#ced4da', padding: '10px 12px' }}>
                                        <input type="text" name="userNameSearch" placeholder="Username*" className="form-control border-0 shadow-none p-0 bg-transparent" value={formData.userNameSearch} onChange={handleChange} />
                                    </div>
                                    {showUserError && <div className="text-danger small mt-1" style={{ fontSize: '12px' }}>Username is required</div>}
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn w-100 text-white fw-bold py-2 shadow-sm" disabled={loading} style={{ backgroundColor: '#821317', borderRadius: '8px' }}>
                                        {loading ? '...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {!loading && hasSearched && (
                <div className="card shadow-sm border-0 rounded-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr style={{ backgroundColor: '#821317', color: 'white' }}>
                                    <th className="fw-normal py-3 ps-3 border-0">Sr. No.</th>
                                    <th className="fw-normal py-3 border-0">Name</th>
                                    <th className="fw-normal py-3 border-0">Username</th>
                                    <th className="fw-normal py-3 border-0">Bank Code</th>
                                    <th className="fw-normal py-3 border-0 text-center">Status</th>
                                    <th className="fw-normal py-3 border-0">Approved level</th>
                                    <th className="fw-normal py-3 border-0 text-center">Status Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((item, index) => {
                                        const personal = item["1"] || {};
                                        const fullName = `${personal.firstName || ''} ${personal.lastName || ''}`.trim();
                                        const isApproved = item.status === 'APPROVED';
                                        const isPending = item.status === 'PENDING';
                                        const statusBadgeStyle = {
                                            backgroundColor: isApproved ? '#e6f4ea' : isPending ? '#f3f1d2' : '#f3c9c9',
                                            color: isApproved ? '#1e7e34' : isPending ? '#bfb606' : '#eb1313',
                                            border: `1px solid ${isApproved ? '#c3e6cb' : '#ffeeba'}`,
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        };
                                        return (
                                            <tr key={item._id || index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                <td className="ps-3 text-muted">{index + 1}</td>
                                                <td className="text-muted" style={{ fontSize: '13px' }}>{fullName || 'N/A'}</td>
                                                <td className="text-dark fw-bold" style={{ fontSize: '13px' }}>{item.username}</td>
                                                <td className="text-muted" style={{ fontSize: '13px' }}>{item.bankCode || 'NSDL'}</td>
                                                <td className="text-center">
                                                    <span className="badge rounded-pill px-3 py-1" style={statusBadgeStyle}>
                                                        <span style={{ fontSize: '8px', verticalAlign: 'middle', marginRight: '5px' }}>●</span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="text-muted small" style={{ fontSize: '12px' }}>{item.approved_level || 'N/A'}</td>
                                                <td className="text-center">
                                                    {item.status_code || 'N/A'}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">No Data Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};