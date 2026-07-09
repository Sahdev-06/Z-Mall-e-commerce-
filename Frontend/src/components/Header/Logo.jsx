import { Handbag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
        <Link to="/" className='flex items-center gap-2'>
            <Handbag className='text-orange-500' />
            <div>
              <span className='text-slate-900 font-bold text-2xl'>Shop</span>
              <span className='text-orange-500 font-bold text-2xl'>Ease</span>
            </div>
        </Link>
    </>
  );
};

export default Logo;
