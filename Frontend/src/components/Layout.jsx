import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col min-h-screen border-l">
                <Navbar />

                <main className="flex-1 p-6">
                    {children}
                </main>

                <Footer />

            </div>

        </div>
    );
}

export default Layout;