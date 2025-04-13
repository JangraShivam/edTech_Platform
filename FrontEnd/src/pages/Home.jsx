import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "../components/core/button";
import banner from '../assets/Images/banner.mp4'
import CodeBlock from "../components/core/CodeBlock";
import HighLightedText from "../components/core/HighLightedText";
import TimeLine from "../components/core/TimeLine";
import Learninglanguage from "../components/core/Learninglanguage";
import instructor from '../assets/Images/Instructor.png'
import Explorer from "../components/core/explorer";
import Footer from "../components/core/Footer";

function Home(){

    return (
        <div className="w-full">
            {/* Section 1 */}
            <div className="relative mx-auto flex flex-col w-9/12 max-w-[1260px] items-center text-white justify-between">
                
                <Link to={'/signup'}>
                <div className="group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">

                    <div className="flex flex-row rounded-full items-center gap-2 px-10 py-[5px] group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>

                </div>
                </Link>

                <div className="font-semibold mt-6 text-white text-center text-3xl">
                    Empower Your Future with <HighLightedText>Coding Skills</HighLightedText>
                </div>

                <div className="text-center mt-4 text-sm px-8 font-semibold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                and get access to a wealth of resources, 
                including hands-on projects, quizzes, and personalized feedback from instructors
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAbutton active={true} linkto={'/signup'}>Learn More</CTAbutton>
                    <CTAbutton active={false} linkto={'/login'}>Book a Demo</CTAbutton>
                </div>

                <div className="shadow-blue-200 my-14 z-0 relative">
                    <video src={banner} typeof="video/mp4" muted loop autoPlay className="z-10" ></video>
                    <div className="absolute w-full h-full top-4 left-4 bg-white -z-10"></div>
                </div>

                <div className="flex flex-col gap-10    ">
                    <CodeBlock position={`lg:flex-row`}
                    heading={<> Unlock your <HighLightedText> coding potential </HighLightedText> with our online courses </>}
                    ctabtn1={{btntext : "Try it yourself", linkto:"/signup" , active : true}}
                    ctabtn2={{btntext : "Learn More", linkto:"/login" , active : false}}
                    Codeblock={`<!DOCTYPE html> 
                        <html> 
                         <head><title>Example</ 
                         title><linkrel="stylesheet"href="styles.css"> 
                       </head> 
                       <body> 
                       <h1><a href="/">Header</a> 
                       </h1> 
                       <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a> 
                       </nav>`}
                        subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}>
                    </CodeBlock>

                    <CodeBlock position={`lg:flex-row-reverse`}
                        heading={<> Start <HighLightedText> coding <br /> in seconds</HighLightedText> </>}
                        ctabtn1={{btntext : "Continue Lesson", linkto:"/signup" , active : true}}
                        ctabtn2={{btntext : "Learn More", linkto:"/login" , active : false}}
                        Codeblock={`<!DOCTYPE html> 
                         <html> 
                          <head><title>Example</ 
                          title><linkrel="stylesheet"href="styles.css"> 
                        </head> 
                        <body> 
                        <h1><a href="/">Header</a> 
                        </h1> 
                        <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a> 
                        </nav>`}
                        subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}>
                    </CodeBlock>
                
                </div>

                <div className="w-11/12 -mb-20">
                <Explorer></Explorer>
                </div>
                
            </div>

            {/* Section 2*/}
            <div className="bg-pure-greys-5 text-richblack-700 ">
                
                <div className="h-[333px] flex items-center gap-6 justify-center homepage_bg">
                        <CTAbutton active={true} linkto={'/signup'}>
                        <div className="flex gap-2 items-center">
                            Explore Full Catalog
                            <FaArrowRight/>
                        </div>
                        </CTAbutton>
                        <CTAbutton active={false} linkto={'/login'}>Learn More</CTAbutton>
                
                </div>
                
                <div className="w-11/12 mx-auto max-w-[1260px] py-20 flex flex-col items-center justify-between">
                        
                    <div className="w-full flex justify-between">
                        <div className="w-[45%] text-3xl font-bold font-inter">
                        Get the skills you need for a <HighLightedText>job that is in demand.</HighLightedText>
                        </div>

                        <div className="w-[45%] flex flex-col gap-10">
                            <p className="text-sm font-bold text-richblack-500">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAbutton active={true} linkto={'/signup'}>Learn More</CTAbutton>
                        </div>
                    </div>
                    
                    <TimeLine></TimeLine>

                    <Learninglanguage></Learninglanguage>

                    
                </div>
            </div>

            {/* Section 3 */}
            <div className="w-full  py-20 bg-richblack-900">

                <div className="w-11/12 mx-auto flex justify-center gap-24 items-center">
                        <div className="w-[40%] relative">
                            <img src={instructor} alt="" className="relative w-full h-full z-2"/>
                            <div className="w-full h-full bg-white absolute -top-4 -left-4 z-1"></div>
                        </div>

                        <div className="w-[35%]">
                            <h1 className="text-3xl text-white font-semibold">Become an <br /> <HighLightedText>instructor</HighLightedText> </h1>
                            <p className="text-sm leading-relaxed mt-4 mb-16 text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                        
                            <CTAbutton active={true} linkto={'/signup'}>
                                <div className="flex gap-2 items-center">
                                    Start Teaching Today
                                    <FaArrowRight/>
                                </div>
                            </CTAbutton>
                        </div>
                </div>

            </div>

            {/* footer*/}
            <div className="w-full bg-richblack-800">
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Home;