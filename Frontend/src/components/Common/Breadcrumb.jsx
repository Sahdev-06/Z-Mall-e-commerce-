import { Link } from 'react-router-dom'

function Breadcrumb() {
    return (
        <>
            <div className='flex items-center gap-2'>
                <Link className='text-gray-500 hover:text-orange-500 transition'>
                    Home
                </Link>
                <span className='text-gray-400'>
                    &gt;
                </span>
                <span className='font-medium text-slate-900'>
                    Electronics
                </span>
            </div>
        </>
    )
}


export default Breadcrumb