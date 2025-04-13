import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";
import { footerLink1 } from "../../data/footer-links";

function Footer(){

    const subjectArray = FooterLink2[0];
    const languageArray = FooterLink2[1];
    const careerArray = FooterLink2[2];
    const companyArray = footerLink1[0];
    const resourceArray = footerLink1[1];
    const planArray = footerLink1[2];
    const communityArray = footerLink1[3];

    return (
        <div className="w-11/12 mx-auto pb-4">

            <div className="w-full flex justify-center border-b-[2px] border-richblack-700 py-10">
                <div className="flex w-[50%] justify-evenly   border-r-[2px] border-richblack-700 gap-8">

<div className="flex flex-col gap-2">

    <div className="text-richblack-100 text-sm font-bold">{companyArray.title}</div>
    {
        companyArray.tags.map((tag) => {
            return (<div className="text-richblack-400 text-xs"> {tag} </div>);
        })
    }
</div>

<div className="flex flex-col gap-2">

    <div className="text-richblack-100 text-sm font-bold">{resourceArray.title}</div>
    {
        resourceArray.tags.map((tag) => {
            return (<div className="text-richblack-400 text-xs"> {tag} </div>);
        })
    }
</div>

<div className="flex flex-col gap-8">

    <div className="flex flex-col gap-2">

    <div className="text-richblack-100 text-sm font-bold">{planArray.title}</div>
    {
        planArray.tags.map((tag) => {
            return (<div className="text-richblack-400 text-xs"> {tag} </div>);
        })
    }
    </div>

    <div className="flex flex-col gap-2">
    <div className="text-richblack-100 text-sm font-bold">{communityArray.title}</div>
    {
        communityArray.tags.map((tag) => {
            return (<div className="text-richblack-400 text-xs"> {tag} </div>);
        })
    }
    </div>
</div>

                </div>

                <div className="flex w-[50%]  border-richblack-700 justify-evenly gap-8">

                <div className="flex flex-col gap-2">
                    <div className="text-richblack-100 text-sm font-bold">{subjectArray.title}</div>
                    {
                        subjectArray.links.map((entry) => {
                            return ( <Link to={entry.link}><div className="text-richblack-400 text-xs">{entry.title}</div></Link> );
                        })
                    }
                </div>

                <div className="flex flex-col gap-2">
                <div className="text-richblack-100 text-sm font-bold">
                    {languageArray.title}</div>
                    {
                        languageArray.links.map((entry) => {
                            return ( <Link to={entry.link}><div className="text-richblack-400 text-xs">{entry.title}</div></Link> );
                        })
                    }
                </div>

                <div className="flex flex-col gap-2">
                <div className="text-richblack-100 text-sm font-bold">
                    {careerArray.title}</div>
                    {
                        careerArray.links.map((entry) => {
                            return ( <Link to={entry.link}><div className="text-richblack-400 text-xs">{entry.title}</div></Link> );
                        })
                    }
                </div>

                </div>
            </div>
                
        <div className="w-full justify-between flex py-6 text-richblack-300">
                
                <div className="flex gap-4 text-sm">
                    <p>Privacy policy</p>
                    <p>Cookie Policy</p>
                    <p>Terms</p>
                </div>

                <div>
                    Made in 2025 StudyNotion
                </div>

            </div>

        </div>
    );
}

export default Footer;