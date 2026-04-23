import { useState } from "react";

export default function WalletAdjustment() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUserRole = (username) => {
        const upper = username.toUpperCase();
        if (upper.startsWith("CBCM")) return "CBC Maker";
        if (upper.startsWith("CBC")) return "CBC";
        if (upper.startsWith("MDS")) return "Agent";
        if (upper.startsWith("DS")) return "Agent";
        if (upper.startsWith("AG")) return "Agent";
        return "Agent";
    };

    const handleSearch = async () => {
        if (!username.trim()) {
            alert("Username is required");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("access_token");

            const res = await fetch(
                "https://apidev.iserveu.online/NSDL/user_onboarding/fetch-user-details",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        username,
                        userRole: getUserRole(username),
                    }),
                }
            );

            const data = await res.json();
            const finalData = data?.resultObj?.data || data;

            setUserData(finalData);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    };

    const fullName = [
        userData?.["1"]?.firstName,
        userData?.["1"]?.middleName,
        userData?.["1"]?.lastName,
    ].filter(Boolean).join(" ");

    return (
        <div className="container-fluid py-4">

            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                <h4 className="fw-bold mb-4">Wallet Adjustment</h4>

                <div className="card p-3 shadow-sm mb-4">
                    <div className="row align-items-end g-2">

                        <div className="col-md-9">
                            <div style={{
                                position: "relative",
                                border: "1px solid #ced4da",
                                borderRadius: "8px",
                                padding: "8px 10px",
                                background: "#fff",
                            }}>
                                <label style={{
                                    position: "absolute",
                                    top: "-8px",
                                    left: "10px",
                                    background: "#fff",
                                    padding: "0 5px",
                                    fontSize: "11px",
                                    color: "#6c757d",
                                    fontWeight: "600",
                                }}>
                                    USER NAME*
                                </label>

                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none p-0"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <button
                                className="btn w-100 text-white"
                                style={{
                                    backgroundColor: "#8b0304",
                                    borderRadius: "8px",
                                    height: "40px",
                                }}
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>

                    </div>
                </div>

                {/* FORM */}
                {userData && (
                    <div className="card p-3 shadow-sm">

                        <h5 className="mb-3 fw-bold">Please Enter all the Details</h5>

                        <div className="row g-2">

                            <div className="col-md-6">
                                <label className="small text-muted">User Name</label>
                                <input
                                    className="form-control"
                                    value={userData?.username || ""}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="small text-muted">Name</label>
                                <input
                                    className="form-control"
                                    value={fullName}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="small text-muted">Types of Operations*</label>
                                <select className="form-select">
                                    <option value="">Select</option>
                                    <option value="CREDIT">Credit</option>
                                    <option value="DEBIT">Debit</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="small text-muted">Amount*</label>
                                <input className="form-control" />
                            </div>

                            <div className="col-md-6">
                                <label className="small text-muted">Wallet</label>
                                <input
                                    className="form-control"
                                    value="Wallet 2"
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="small text-muted">Remark*</label>
                                <input className="form-control" />
                            </div>

                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-3">
                            <button
                                className="btn btn-outline-danger px-4"
                                onClick={() => setUserData(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn text-white px-4"
                                style={{ backgroundColor: "#8b0304" }}
                            >
                                Save
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}