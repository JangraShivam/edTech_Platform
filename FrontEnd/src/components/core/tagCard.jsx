import { HiMiniUsers } from "react-icons/hi2";
import { FaSitemap } from "react-icons/fa6";

function TagCard({index,heading,description,level,lessionNumber}){
    return (
        <div className="relative w-[28%] ">
            <div className={`z-1 flex relative w-full gap-12 justify-between pt-4 flex-col ${index === 0 ? 'bg-white' : 'bg-richblack-800' } text-black`}>
             
             <div >
                <h2 className={`font-semibold text-sm mx-4 ${index === 0 ? 'text-black' : 'text-white' }`}>{heading}</h2>
                <p className={`text-xs my-2 mx-4  text-richblack-400 }`}>{description}</p>
             </div>

             <div className={`flex justify-between  px-4 py-2 text-xs border-t-[1px] font-semibold border-dashed border-t-richblack-400 ${index === 0 ? 'text-blue-500': 'text-richblack-300'}`}>
                <div className="flex items-center gap-2">
                    <HiMiniUsers />
                    {level}
                    </div>
                <div className="flex items-center gap-2">
                    <FaSitemap />
                    {lessionNumber} Lessons</div>
             </div>  
            </div>

            <div className={`w-full h-full absolute bg-yellow-50 top-2 left-2 z-0 ${index === 0 ? 'visible' : 'hidden'}`}></div>
           
        </div>
    );
}

export default TagCard;