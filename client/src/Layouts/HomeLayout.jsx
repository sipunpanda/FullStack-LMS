
import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

function HomeLayout({ children }) {

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
                            <li>
                                <Link to="/courses">All Courses</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
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