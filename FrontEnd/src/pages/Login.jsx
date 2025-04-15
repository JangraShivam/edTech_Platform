import Template from "../components/loginandsignUp/template";
import studentimg from '../assets/Images/login.webp'
function Login(){

    return (
        <div>
            <Template heading={'Welcome Back'}
                    line1={'Build skills for today, tomorrow, and beyond'} 
                    line2={'Education to future-proof your career.'}
                    type={'Login'}
                    img={studentimg}
                    instrucLine={"Be unstoppable"}
            ></Template>
        </div>
    );
}

export default Login;