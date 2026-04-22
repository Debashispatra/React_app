import MainLayout from "../components/layouts/MainLayout";

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <MainLayout>

            <div
                className="d-flex justify-content-center align-items-center text-center"
                style={{ height: "70vh" }}
            >
                <div>
                    <p className="mb-3" style={{fontSize: "24px", fontWeight: "500"}}>
                        Welcome to NSDL
                    </p>
                    <p className="fs-5">
                        Banking made easy - Just in a jiffy
                    </p>
                </div>
            </div>

        </MainLayout>
    );
}