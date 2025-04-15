import { useState } from "react";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

function LoginForm(){

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full mt-8 space-y-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-richblack-5">Email Address</label>
                <input className="w-full placeholder:text-richblack-200  text-richblack-200 placeholder:font-[500] rounded-md p-4 bg-richblack-800" type="email" name="email" id="email" placeholder="Enter email Address"/>
            </div>

            <div className="flex flex-col relative gap-2">
                <label htmlFor="password" className="text-richblack-5">Password</label>
                
                <input className="w-full placeholder:text-richblack-200 text-richblack-200 placeholder:font-[500] rounded-md p-4 bg-richblack-800" type={`${showPassword ? 'text' : 'password'}`} name="password" id="password" placeholder="Enter password"/>

                <GoEye onClick={() => setShowPassword(true)} className={`absolute text-richblack-200 bottom-4 text-[25px] right-4 ${showPassword ? 'hidden' : 'visible'}`} />

                <GoEyeClosed onClick={() => setShowPassword(false)} className={`absolute text-richblack-200 bottom-4 text-[25px] right-4 ${!showPassword ? 'hidden' : 'visible'}`} />

                <p className="absolute -bottom-6 text-blue-100 right-0 text-xs">Forgot password?</p>
            </div>

            <button className='w-full text-center bg-yellow-50 py-4 rounded-md font-bold mt-10'>Sign in</button>
        </div>
    );
}

export default LoginForm;