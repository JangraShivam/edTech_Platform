import timelineimg from '../../assets/Images/TimelineImage.png'
import logo1 from '../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../assets/TimeLineLogo/Logo4.svg'

function TimeLine(){

    return (
        <div className="w-full flex my-20">

            <div className="w-[40%] flex flex-col ">
                <div className="flex items-center my-2 gap-4">
                    <div className='bg-white shadow-2xl py-3 px-4 rounded-3xl'><img src={logo1} alt="" /></div>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Leadership</p>
                        <p className='text-sm text-richblack-700'>Fully committed to the success company</p>
                    </div>
                </div>

                <div className='w-[1px] ml-5 h-8 bg-richblack-400'></div>

                <div className="flex items-center my-2 gap-4">
                    <div className='bg-white shadow-2xl py-3 px-3 rounded-3xl'><img src={logo2} alt="" /></div>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Leadership</p>
                        <p className='text-sm text-richblack-700'>Fully committed to the success company</p>
                    </div>
                </div>

                <div className='w-[1px] ml-5 h-8 bg-richblack-400'></div>

                <div className="flex items-center my-2 gap-4">
                    <div className='bg-white shadow-2xl py-3 px-3 rounded-3xl'><img src={logo3} alt="" /></div>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Leadership</p>
                        <p className='text-sm text-richblack-700'>Fully committed to the success company</p>
                    </div>
                </div>

                <div className='w-[1px] ml-5 h-8 bg-richblack-400'></div>

                <div className="flex items-center my-2 gap-4">
                    <div className='bg-white shadow-2xl py-3 px-3 rounded-3xl'><img src={logo4} alt="" /></div>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Leadership</p>
                        <p className='text-sm text-richblack-700'>Fully committed to the success company</p>
                    </div>
                </div>
            </div>

            <div className="w-[50%] relative">
                <img src={timelineimg} alt=""  className='relative'/>
                <div className='absolute bg-caribbeangreen-700 flex w-[80%] -bottom-12 py-8 left-12 text-white'>
                    <div className='w-[50%] flex gap-4 justify-center items-center border-r-1 border-caribbeangreen-300'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-xs leading-relaxed text-caribbeangreen-300'>YEARS <br /> EXPERIENCES</p>
                    </div>

                    <div className='w-[50%] flex justify-center gap-4 items-center'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-xs leading-relaxed text-caribbeangreen-300'>TYPES OF <br /> COURSES</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeLine;