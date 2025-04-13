import CTAbutton from "./button";
import { FaArrowRight } from "react-icons/fa";
import HighLightedText from "./HighLightedText"
import { TypeAnimation } from "react-type-animation";

function CodeBlock({position, heading, subheading, ctabtn1 , ctabtn2, Codeblock, bgGradient}){

    return (
        <div className={`flex flex-col ${position} my-20 justify-between`}>
            <div className="w-[45%] flex flex-col gap-2 font-inter">
                <h1 className="text-3xl font-semibold text-white">{heading}  </h1>
                <p className="text-richblack-300  ">{subheading}</p>
                
                <div className="flex gap-7 mt-7">
                    <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btntext}
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>

                    <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                            {ctabtn2.btntext}
                    </CTAbutton>
                </div>
            </div>

            <div className="flex gap-4 w-[40%] bg-[#060f1e] p-4">
                <div className="text-center text-richblack-500 font-mono font-bold text-[14px] flex flex-col justify-between">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className="whitespace-pre-line font-mono text-[14px] leading-relaxed text-white">
                    <TypeAnimation sequence={[Codeblock, 1000, "", 1000]} speed={50} repeat={Infinity}></TypeAnimation>
                </div>
            </div>

            
        </div>
    );
}

export default CodeBlock;