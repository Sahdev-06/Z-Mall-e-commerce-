import { Package, FolderTree, ClipboardList, TicketPercent } from 'lucide-react';
import StatsCard from '../../components/Admin/StatsCard';
import AdminLayout from '../../components/Admin/AdminLayout';


function Dashboard() {
    return (
        <>
            <AdminLayout title="Dashboard">
                <div className='space-y-8'>
                    <div>
                        <p className='text-3xl font-bold text-slate-900'>
                            Welcome back, Sahdev
                        </p>
                        <p className='text-gray-500 mt-2'>
                            Here's what's happening with your store today
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8'>
                        <StatsCard
                            title={"Total Products"}
                            count={258}
                            icon={Package}
                        />
                        <StatsCard
                            title={"Categories"}
                            count={12}
                            icon={FolderTree}
                        />
                        <StatsCard
                            title={"Orders"}
                            count={89}
                            icon={ClipboardList}
                        />
                        <StatsCard
                            title={"Coupons"}
                            count={6}
                            icon={TicketPercent}
                        />
                    </div>
                    <div className='bg-white rounded-2xl shadow-sm p-6'>
                        <p className='text-xl font-semibold text-slate-900'>
                            Recent Products
                        </p>
                        <p>
                            Product table will be displayed here.
                        </p>
                    </div>
                    <div className='bg-white rounded-2xl shadow-sm p-6'>
                        <p className='text-xl font-semibold text-slate-900'>
                            Recent Orders
                        </p>
                        <p>
                            Recent orders will be displayed here.
                        </p>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}


export default Dashboard