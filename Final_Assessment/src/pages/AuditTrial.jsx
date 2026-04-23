import MainLayout from "../components/layouts/MainLayout";
import React, { useState } from 'react';

export default function AuditTrial() {
    const [formData, setFormData] = useState({
        fromDate: '2026-04-22',
        toDate: '2026-04-22',
        username: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const floatingLabelBox = {
        position: 'relative',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '6px 12px 2px 12px',
        backgroundColor: '#fff',
        minHeight: '48px'
    };

    const floatingLabelText = {
        position: 'absolute',
        top: '-10px',
        left: '10px',
        backgroundColor: '#fff',
        padding: '0 4px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#6c757d',
        zIndex: 2
    };

    const tableHeaderStyle = {
        backgroundColor: '#821317',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px'
    };

    return (
            <div className="container-fluid pt-3">

                {/* --- Search Filters Section --- */}
                <div className="row g-3 align-items-center mb-4">
                    <div className="col-md-2">
                        <div style={floatingLabelBox}>
                            <label style={floatingLabelText}>From Date*</label>
                            <input 
                                type="date" 
                                name="fromDate" 
                                className="form-control border-0 shadow-none p-0 bg-transparent mt-1" 
                                value={formData.fromDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div style={floatingLabelBox}>
                            <label style={floatingLabelText}>To Date*</label>
                            <input 
                                type="date" 
                                name="toDate" 
                                className="form-control border-0 shadow-none p-0 bg-transparent mt-1" 
                                value={formData.toDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="username"
                                placeholder="Username" 
                                className="form-control shadow-none py-2" 
                                style={{ borderRadius: '4px', minHeight: '48px' }}
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        {/* Large Submit Button */}
                        <button className="btn text-white fw-bold w-100 py-2 fs-5" style={{ backgroundColor: '#821317', borderRadius: '10px', minHeight: '48px' }}>
                            Submit
                        </button>
                    </div>
                </div>

                {/* --- Action Bar --- */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="position-relative" style={{ width: '250px' }}>
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                        <input 
                            type="text" 
                            className="form-control ps-5 shadow-none border-secondary-subtle" 
                            placeholder="Search Here" 
                            style={{ borderRadius: '4px' }}
                        />
                    </div>
                </div>

                {/* --- Table Section --- */}
                <div className="card shadow-sm border-0 rounded-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr style={tableHeaderStyle}>
                                    <th className="py-3 text-center border-0">Sr. No.</th>
                                    <th className="py-3 border-0 text-center">Name</th>
                                    <th className="py-3 border-0 text-center">Username</th>
                                    <th className="py-3 border-0 text-center">Bank Code</th>
                                    <th className="py-3 border-0 text-center">Status</th>
                                    <th className="py-3 border-0 text-center">Approved level</th>
                                    <th className="py-3 text-center border-0">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, name: 'Sandip Shantaram Pawaskar', user: 'DSUP000009', bank: 'NSDL', status: 'APPROVED', level: 'APPROVED BY OPS_CHECKER' },
                                    { id: 2, name: 'MANAS KUMAR JENA', user: 'DSUP000008', bank: 'NSDL', status: 'APPROVED', level: 'APPROVED BY OPS_CHECKER' },
                                    { id: 3, name: 'orange apple', user: 'CBC0000095', bank: 'NSDL', status: 'PENDING', level: 'PENDING AT OPS CH' },
                                    { id: 4, name: 'kiwi mango', user: 'CBC0000094', bank: 'NSDL', status: 'PENDING', level: 'PENDING AT OPS CH' },
                                ].map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #eee', backgroundColor: idx % 2 !== 0 ? '#fff9f9' : 'white' }}>
                                        <td className="text-center text-muted small">{row.id}</td>
                                        <td className="text-center text-muted small" style={{ maxWidth: '150px' }}>{row.name}</td>
                                        <td className="text-center text-muted small">{row.user}</td>
                                        <td className="text-center text-muted small">{row.bank}</td>
                                        <td className="text-center">
                                            <span className={`badge rounded-pill px-3 py-1 ${row.status === 'APPROVED' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`} 
                                                  style={{ fontSize: '11px', border: '1px solid currentColor', fontWeight: 'bold' }}>
                                                ● {row.status}
                                            </span>
                                        </td>
                                        <td className="text-center text-muted small">{row.level}</td>
                                        <td className="text-center">
                                            <button className="btn btn-link text-dark p-0 shadow-none">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Footer */}
                    <div className="d-flex justify-content-between align-items-center p-2 border-top bg-white">
                        <div className="d-flex align-items-center gap-2 ms-2">
                            <span className="small text-muted">Items per page:</span>
                            <select className="form-select form-select-sm border-0 bg-light shadow-none" style={{ width: '65px' }}>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center gap-4 small text-muted me-2">
                            <span>1 - 5 of 18</span>
                            <div className="d-flex gap-3">
                                <i className="bi bi-chevron-double-left cursor-pointer"></i>
                                <i className="bi bi-chevron-left cursor-pointer"></i>
                                <i className="bi bi-chevron-right cursor-pointer"></i>
                                <i className="bi bi-chevron-double-right cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}