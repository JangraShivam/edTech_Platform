import { useState } from 'react';
import frame from '../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm';
import insImg from '../../assets/Images/instructorimg.png'
function Template({heading, line1, line2, type, img, instrucLine}){

    const [mode, setMode] = useState('Student');

    return (
        <div className='w-10/12 mb-20 mx-auto flex justify-center gap-24 mt-20'>

            <div className='w-[40%]'>
                <h1 className='text-3xl font-[600] font-inter text-white my-4'>{heading}</h1>
                <p className='text-sm text-richblack-100 font-inter font-[400]'>{line1}</p>
                <p className='text-sm text-blue-100 font-edu-sa font-bold'>{mode === 'Student' ? line2 : instrucLine}</p>

                <div className='bg-richblack-800 flex mt-8 text-sm font-inter  w-fit gap-4 py-1 px-2 rounded-3xl'>
                    <p onClick={() => setMode('Student')} className={`py-1 px-2 rounded-2xl ${mode === 'Student' ? 'bg-richblack-900 text-white' : 'bg-none text-richblack-200'}`}>Student</p>
                    <p onClick={() => setMode('Instructor')} className={`py-1 px-2 rounded-2xl ${mode === 'Instructor' ? 'bg-richblack-900 text-white' : 'bg-none text-richblack-200'}`}>Instructor</p>
                </div>

                {
                    type === 'Login' ?  
                    (<LoginForm></LoginForm>) : 
                    (<SignUpForm></SignUpForm>)
                }


            </div>

            <div className='relative w-[45%]'>
                <img src={mode === "Student" ? img : insImg} alt="" className='w-full relative z-20'/>
                <img src={frame} alt="" className='w-full absolute top-4 left-4 z-10' />
            </div>

        </div>
    );
}

export default Template;