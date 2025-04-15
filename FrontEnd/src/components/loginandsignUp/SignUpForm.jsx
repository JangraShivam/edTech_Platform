import countryCode from '../../data/countrycode.json'
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

function SignUpForm(){

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="text-sm space-y-4 my-8  font-inter">
            <div className="flex w-full justify-between ">

                <div className="w-[48%] flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-richblack-5">First Name</label>
                    <input className="w-full rounded-md p-4 placeholder:text-richblack-200 placeholder:font-[500] bg-richblack-800" type="text" name="firstName" id="firstName"  placeholder="Enter first Name" />
                </div>

                <div className="w-[48%] flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-richblack-5">Last Name</label>
                    <input className="w-full placeholder:text-richblack-200 placeholder:font-[500] rounded-md p-4 bg-richblack-800" type="text" name="lastName" id="lastName" placeholder="Enter Last Name" />
                </div>

            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-richblack-5">Email Address</label>
                <input className="w-full placeholder:text-richblack-200 placeholder:font-[500] rounded-md p-4 bg-richblack-800" type="email" name="email" id="email" placeholder="Enter email Address"/>
            </div>

            <div className="flex flex-col w-full justify-between text-sm space-y-4 font-inter">
                <label htmlFor="PhoneNumber" className="text-richblack-5">PhoneNumber</label>

                <div className="w-full flex justify-between">
                    <div className='w-[20%] bg-richblack-800 flex justify-center px-2 rounded-md'>
                    <select name="countryCode" id="countryCode" className='w-full  placeholder:text-richblack-200 placeholder:font-[500] rounded-md bg-richblack-800 text-richblack-200'>
                        {
                            countryCode.map((country) => {
                                return (<option value={country.country}>{country.code} - {country.country}</option>)
                            })
                        }
                    </select>
                    </div>

                    <div className='w-[75%]'>
                        <input type="number" placeholder='12345 67890' name="PhoneNumber" id="PhoneNumber" className='p-4 rounded-md placeholder:text-richblack-200 placeholder:font-[500]  w-full text-richblack-200 bg-richblack-800'/>
                    </div>
                </div>

                

            </div>
            
            <div className="flex w-full justify-between ">

                <div className="w-[48%] relative flex flex-col gap-2">
                    <label htmlFor="password" className="text-richblack-5">Create Password</label>
                    <input className="w-full rounded-md p-4 placeholder:text-richblack-200 placeholder:font-[500] text-richblack-200 bg-richblack-800" type={`${showPassword ? 'text' : 'password'}`} name="password" id="password"  placeholder="Enter Password" />
                    
                    <GoEye onClick={() => setShowPassword(true)} className={`absolute text-richblack-200 bottom-4 text-[25px] right-4 ${showPassword ? 'hidden' : 'visible'}`} />

                    <GoEyeClosed onClick={() => setShowPassword(false)} className={`absolute text-richblack-200 bottom-4 text-[25px] right-4 ${!showPassword ? 'hidden' : 'visible'}`} />
                </div>

                <div className="w-[48%] relative flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-richblack-5">Confirm Password</label>
                    <input className="w-full placeholder:text-richblack-200 text-richblack-200 placeholder:font-[500] rounded-md p-4 bg-richblack-800" type={`${showConfirmPassword ? 'text' : 'password'}`} name="confirmPassword" id="confirmPassword" placeholder="Enter Password" />
                
                    <GoEye onClick={() => setShowConfirmPassword(true)} className={`absolute text-richblack-200 bottom-4 text-[25px] right-4 ${showConfirmPassword ? 'hidden' : 'visible'}`} />

                    <GoEyeClosed onClick={() => setShowConfirmPassword(false)} className={`absolute text-richblack-200 bottom-4 text-[25px] right-4 ${!showConfirmPassword ? 'hidden' : 'visible'}`} />
                </div>

            </div>

            <button className='w-full text-center bg-yellow-50 py-4 rounded-md font-bold mt-8'>Create Account</button>

        </div>
    );
}

export default SignUpForm;