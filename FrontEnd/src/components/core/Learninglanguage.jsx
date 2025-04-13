import HighLightedText from "./HighLightedText";
import planLesson from '../../assets/Images/Plan_your_lessons.svg'
import compareOthers from '../../assets/Images/Compare_with_others.svg'
import knowProgress from '../../assets/Images/Know_your_progress.svg'
import CTAbutton from "./button";

function Learninglanguage(){

    return (
        <div className="w-full flex flex-col items-center py-10">
            <div className="w-8/12 mx-auto space-y-2">
                <h1 className="text-center text-3xl font-semibold">Your swiss knife for <HighLightedText>learning any language</HighLightedText> </h1>
                <p className="text-center px-6 text-sm text-richblack-800">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>

            <div className="w-full flex  justify-center relative my-16">

                <div className="relative w-[30%] left-8 scale-110 z-1"><img src={knowProgress} alt="" /></div>
                <div className="relative w-[30%] scale-120 z-2"><img src={compareOthers} alt="" /></div>
                <div className="relative w-[30%] scale-120 right-10 z-3"><img src={planLesson} alt="" /></div>
            </div>

            <CTAbutton active={true} linkto={'/signup'}>Learn More</CTAbutton>

        </div>
    );
}

export default Learninglanguage;