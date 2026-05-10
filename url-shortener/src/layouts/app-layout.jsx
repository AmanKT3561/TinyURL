import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {
    return (
        <div>
            <main className="min-h-screen px-6 sm:px-12 lg:px-24">
                <Header />
                <Outlet />
            </main>

            <div className="p-10 bg-gray-800 mt-10 text-center">
                Made with ❤️ by Bob
            </div>
        </div>
    )
}

export default AppLayout