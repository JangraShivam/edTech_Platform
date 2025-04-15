import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { useSelector } from "react-redux";
import { useLocation, } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../auth/profiledropdown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { FaChevronDown } from "react-icons/fa";


function NavBar(){

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [sublinks, setSublinks] = useState([]);

    const fetchSubLinks = async() => {
        try{
            console.log(categories.CATEGORIES_API);
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Printing sublinks result ", result);
            setSublinks(result.data.data)
        }
        catch(error){
            console.log('could not fetch category list');
        }
    } 


    useEffect(() => {
        fetchSubLinks();
    },[])


    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname)
    }

    return (
        <div className="w-full h-14 flex justify-center items-center border-b-[1px] border-richblack-700">

            <div className="w-11/12 mx-auto flex items-center justify-between max-w-[1260px]">

               <Link to='/'>
                    <img src={Logo} className="w-[160px] h-[32px]" alt="" />
               </Link>

                <div className="flex gap-4">
                    {
                        NavbarLinks.map((elem,index) => {
                            return (<div key={index}> 
                                {
                                    elem.title === 'Catalog' ? 
                                    (<div className="text-richblack-25 relative group flex items-center gap-1">
                                        <p >{elem.title}</p>
                                        <FaChevronDown />
                                        <div className="invisible absolute z-5 -left-24 text-black top-10  flex flex-col rounded-md lg:w-[250px] bg-richblack-5 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                            <p>;fjoesdjfg</p>
                                            <p>;jfjsef</p>

                                        </div>
                                        <div className="invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 absolute w-[30px] h-[30px] left-8 rotate-45 top-8 z-10 bg-richblack-5"></div>
                                    </div>) : 

                                    (<Link to={elem.path}> 
                                    <p className={`${matchRoute(elem.path) ? 'text-yellow-25' : "text-richblack-25"}`}>
                                        {elem.title}
                                    </p> 
                                    </Link>)

                                }
                            </div>)
                        })
                    }
                </div>

                <div className="flex gap-4 items-center">

                        {
                            user && user?.accountType != 'Instructor' && (
                                <Link to='/dashboard/cart' className="relative"> <AiOutlineShoppingCart />
                                
                                {
                                    totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                }

                                </Link>
                            )
                        }

                        {
                            token === null && (
                                <Link to='/login'>
                                    <button className="py-2 px-3 text-sm rounded-md border-2 border-richblack-700 bg-richblack-800 text-richblack-100">Log in</button>
                                </Link>
                            )
                        }
                        {
                            token === null && (
                                <Link to='/SignUp'>
                                    <button className="py-2 px-3 text-sm rounded-md border-2 border-richblack-700 bg-richblack-800 text-richblack-100">Sign Up</button>
                                </Link>
                            )
                        }

                        {
                            token !== null && <ProfileDropDown/>
                        }
                </div>
            
            </div>


        </div>
    );
}

export default NavBar;