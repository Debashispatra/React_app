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

    /* --- Styles to match Figma precisely --- */
    const floatingLabelBox = {
        position: 'relative',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '6px 12px 2px 12px',
        backgroundColor: '#fff',
        minHeight: '45px'
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
        <MainLayout>
            <div className="container-fluid pt-3">
                <h4 className="mb-4 fw-bold">Audit Trial Report</h4>

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
                    <div className="col-md-2">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="username"
                                placeholder="Username" 
                                className="form-control shadow-none py-2" 
                                style={{ borderRadius: '4px' }}
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-1">
                        <button className="btn text-white fw-bold px-4 py-2" style={{ backgroundColor: '#821317', borderRadius: '8px' }}>
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
                    <button className="btn btn-dark d-flex align-items-center gap-2" style={{ backgroundColor: '#4a5568', border: 'none' }}>
                        <i className="bi bi-download"></i> Download Sample File
                    </button>
                </div>

                {/* --- Table Section --- */}
                <div className="card shadow-sm border-0 rounded-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr style={tableHeaderStyle}>
                                    <th className="py-3 text-center border-0" style={{ width: '80px' }}>Sno</th>
                                    <th className="py-3 border-0">Field Name</th>
                                    <th className="py-3 border-0">User Name</th>
                                    <th className="py-3 border-0">User ID</th>
                                    <th className="py-3 border-0">Admin Name</th>
                                    <th className="py-3 text-center border-0">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map((idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                        <td className="text-center text-muted">{idx}</td>
                                        <td className="text-muted">kitchen</td>
                                        <td className="text-muted">Maker</td>
                                        <td className="text-dark fw-bold">rYd306</td>
                                        <td className="text-muted">Jonathan Velasquez</td>
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
                    <div className="d-flex justify-content-between align-items-center p-3 border-top">
                        <div className="d-flex align-items-center gap-2">
                            <span className="small text-muted">Items per page:</span>
                            <select className="form-select form-select-sm border-0 bg-light shadow-none" style={{ width: '60px' }}>
                                <option>5</option>
                                <option>10</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center gap-4 small text-muted">
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
        </MainLayout>
    );
}