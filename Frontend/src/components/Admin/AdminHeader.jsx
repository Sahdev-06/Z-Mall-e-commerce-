import { CircleUserRound, ChevronDown } from 'lucide-react';

function AdminHeader({ title }) {
    return (
        <>
            <div className='bg-white border-b border-gray-200 px-8 py-5 flex items-center
                            justify-between'>
                <div>
                    <p className='text-2xl font-bold text-slate-900'>
                        {title}
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <CircleUserRound className='w-10 h-10 rounded-full bg-orange-100
                                    text-orange-500 p-2'/>
                    <span className='text-sm font-medium text-slate-700'>
                        Shadev Kumar
                    </span>
                    <ChevronDown className='w-4 h-4 text-slate-500'/>
                </div>
            </div>
        </>
    )
}


export default AdminHeader