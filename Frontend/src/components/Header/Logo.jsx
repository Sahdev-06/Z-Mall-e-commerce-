import { Handbag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ color }) => {
  return (
    <>
      <Link to="/" className='flex items-center gap-2'>
        <Handbag className='h-6 w-6 text-orange-500' />
        <span className='text-xl font-bold'>
          <span className='text-orange-500'>Shop</span>
          <span className={`${color ? color : "text-slate-900"}`}>Ease</span>
        </span>
      </Link>
    </>
  );
};

export default Logo;
