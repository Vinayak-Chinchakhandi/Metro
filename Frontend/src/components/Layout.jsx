import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {

    return (

        <div className="flex bg-indigo-50 min-h-screen">

            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col">

                <Navbar />

                <main className="flex-1 p-8">

                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>

                </main>

                <Footer />

            </div>

        </div>

    );
}

export default Layout;