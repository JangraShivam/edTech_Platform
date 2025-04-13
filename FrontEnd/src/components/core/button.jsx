import { Link } from "react-router-dom";

function CTAbutton({children, active, linkto}){
    return (
        <div className="relative w-fit z-0 hover:scale-95 transition-all duration-200 ">
            <Link to={linkto} className="relative z-0">
            <div className={`text-center relative z-0 text-[18px] px-6 py-3 rounded-md font-semibold 
            ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800 text-white'} `}>
                {children}
            </div>
            </Link>
            <div className={`absolute -z-10 ${active ? 'bg-yellow-5' : 'bg-richblack-300'} top-0.5 left-0.5 rounded-md w-full h-full`}></div>
        </div>
    );
}

export default CTAbutton;