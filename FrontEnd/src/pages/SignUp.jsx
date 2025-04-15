import Template from "../components/loginandsignUp/template";
import studentimg from '../assets/Images/signup.webp'
function SignUp(){

    return (
        <div>
            <Template heading={'Join the millions learning to code with StudyNotion for free'}
                    line1={'Build skills for today, tomorrow, and beyond'} 
                    line2={'Education to future-proof your career.'}
                    type={'SignUp'}
                    img={studentimg}
                    instrucLine={'Be unstoppable'}
            ></Template>
        </div>
    );
}

export default SignUp;