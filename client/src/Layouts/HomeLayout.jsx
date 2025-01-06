
import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //for checking if the user is logged in or not
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    //for displaying the options acc to role
const role = useSelector((state) => state?.auth?.role)

    function changewidth() {
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSide = document.getElementById('drawer-side');
        drawerSide[0].style.width = 0;
    }

    function handleLogout(e){
        e.preventDefault();

        // const res = await dispatch(logout());

    //    if (res?.payload) {
    //      navigate("/")
    //    }
    }

    return (
        <>
            <div className="min-h-[90vh]">
                <div className="drawer absolute left-0 z-50 w-fit">
                    <input type="checkbox" className="drawer-toggle" id="my-drawer" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="cursor-pointer relative">
                            <FiMenu
                                onClick={changewidth}
                                size={32}
                                className='font-bold text-black dark:text-white m-4'
                            />


                        </label>
                    </div>

                    <div className="drawer-side w-0">
                        <label htmlFor="my-drawer" className="drawer-ovwerlay">

                        </label>
                        <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
                            <li className="w-fit absolute right-2 z-50">
                                <button onClick={hideDrawer}>
                                    <AiFillCloseCircle size={24} className="" />
                                </button>
                            </li>
                            <li>
                                <Link to="/">Home</Link>
                            </li>

                                {isLoggedIn && role === 'ADMIN' && (
                                    <li>
                                        <Link to="/admin/dashboard">Admin Dashboard</Link>
                                    </li>
                                )}

                            <li>
                                <Link to="/courses">All Courses</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>

                            {!isLoggedIn && (
                                <li className="relative bottom-4 w-[90%]">

                                <div className="w-full flex items-center justify-center">
                                    <button className='btn btn-primary btn-sm font-semibold rounded-md w-[50%]'>
                                        <Link to="/login">Login </Link>
                                    </button>
                                    <button className="btn btn-secondary btn-sm font-semibold rounded-md w-[50%]">
                                        <Link to="/register"> Signup</Link>
                                    </button>
                                </div>
                                </li>
                            )}

                            {isLoggedIn && (
                                <li className="relative bottom-4 w-[90%]">

                                <div className="w-full flex items-center justify-center">
                                    <button className='btn btn-primary btn-sm font-semibold rounded-md w-[50%]'>
                                        <Link to="/user/profile">Profile </Link>
                                    </button>
                                    <button className="btn btn-secondary btn-sm font-semibold rounded-md w-[50%]">
                                        <Link onClick={handleLogout}> Logout</Link>
                                    </button>
                                </div>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>

                {children}

                <Footer />

            </div>
        </>
    )
}

export default HomeLayout;