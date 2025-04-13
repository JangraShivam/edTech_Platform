import { useState } from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import HighLightedText from "./HighLightedText";
import TagCard from "./tagCard";

function Explorer(){

    const tagArray = HomePageExplore.map((section) => section.tag).filter((tag) => tag);

    const [Tag, setTag] = useState('Free');

    const tagContent = HomePageExplore.filter((section) => section.tag === Tag).map((section) => section.courses).flat();


    return (
        <div className="w-full flex flex-col justify-center items-center my-8">
            <h1 className="text-3xl font-bold">Unlock the <HighLightedText>Power of Code</HighLightedText></h1>
            <p className="text-sm text-richblack-400 my-2">Learn to Build anything you can imagine</p>

            <div className="flex gap-4 bg-richblack-700 mt-4 px-2 py-1 rounded-2xl text-richblack-300 font-inter">
                {
                    tagArray.map((tag) => {
                        return (<div onClick={ () => {
                            setTag(tag);
                        }} className={`py-1 px-2 rounded-xl ${Tag === tag ? 'bg-richblack-900 text-white' : ''}`}> {tag} </div>)
                    })
                }
            </div>

            <div className="flex justify-center gap-8 mt-12">
                {
                    tagContent.map((course, index) => {
                        return (<TagCard  key={index} index={index} {...course}></TagCard>);
                    })
                }
            </div>

        </div>
    );
}

export default Explorer;