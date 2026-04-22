import MainLayout from "../components/layouts/MainLayout";

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <MainLayout>

            <h4>Wallet Adjustment</h4>

        </MainLayout>
    );
}