import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"


function AdminLayout({ title, children }) {
    return (
        <>
            <div className="min-h-screen flex bg-slate-100">
                <div>
                    <AdminSidebar />
                </div>
                <div className="flex flex-col flex-1">
                    <div>
                        <AdminHeader title={title} />
                    </div>
                    <main className="flex-1 p-8 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}


export default AdminLayout