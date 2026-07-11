import { Handbag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ theme }) => {
  return (
    <>
        <Link to="/" className='flex items-center gap-2'>
            <Handbag className='text-orange-500' />
            <div>
              <span className={theme}>Shop</span>
              <span className='text-orange-500 font-bold text-2xl'>Ease</span>
            </div>
        </Link>
    </>
  );
};

export default Logo;
