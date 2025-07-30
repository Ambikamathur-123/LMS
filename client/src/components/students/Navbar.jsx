import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const{isEducator} = useContext(AppContext);
 
  const location = useLocation();
  const navigate = useNavigate();


  const isCourseListPage = location.pathname.includes('/course-list');
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <Link to='/'> <img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' /></Link>
     

      {/* Desktop view */}
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          {user && (
            <>
              <button onClick={() => navigate(isEducator ? '/educator-dashboard' : '/educator-onboarding')}>
               {isEducator ? 'Educator Dashboard' : 'Become Educator'}
             </button>
              <Link to='/my-enrollements'>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>
            Sign in
          </button>
        )}
      </div>

      {/* Mobile view */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
       
        {user && (
          <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
            
            <button onClick={() => navigate(isEducator ? '/educator-dashboard' : '/educator-onboarding')}>
  {isEducator ? 'Educator Dashboard' : 'Become Educator'}
</button>

            <Link to='/my-enrollments'>My Enrollments</Link>
          </div>
        )}
        <button onClick={()=> openSignIn()}>
          {user ? <UserButton /> : <img src={assets.user_icon} alt="User Icon" />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
