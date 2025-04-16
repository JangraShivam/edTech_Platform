import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword(){

    const [emailSent, setSentEmail] = useState(false);
    const [email, setEmail] = useState('');
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            {
                loading ? 
                ( <div>Loading</div> ) : 
                ( <div className="text-richblack-5 gap-4 font-inter flex flex-col p-4 w-[508px]">

                    <h1 className="text-2xl font-semibold">{ !emailSent ? "Reset Your Password" : "Check Your Email"}</h1>

                    <p className="text-richblack-100">
                        {
                        !emailSent ? 
                        'Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery' 
                        : 
                        `We have sent the reset email to ${email}`
                        }
                    </p>
                    
                    {
                        !emailSent && (
                        <div className="flex my-6 gap-2 flex-col"> 
                            <label className="text-sm" htotmlFor="email">Email Address</label>
                            <input className="bg-richblack-800 rounded-md p-2" placeholder="Enter your email address" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        )
                    }

                    {
                        emailSent ? 
                        ( <button className="bg-yellow-50 p-2 text-center text-black rounded-md">Resend Email</button> ) 
                        : 
                        ( <button onClick={(e) => {
                            e.preventDefault();
                            dispatch(getPasswordResetToken(email,setEmail));

                        }} className="bg-yellow-50 p-2 text-center text-black rounded-md">Reset Password</button> )
                    }

                    <Link to={'/login'} >
                        <div className="text-sm flex gap-2 items-center">
                                <GoArrowLeft className="text-2xl" />
                                Back to Login
                        </div>
                    </Link>
                </div> )
                
            }
        </div>
    );
}

export default ForgotPassword;