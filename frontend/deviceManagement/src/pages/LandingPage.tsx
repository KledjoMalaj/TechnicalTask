import {RegisterForm} from "@/components/signup-form.tsx";
import {LoginForm} from "@/components/login-form.tsx";

function LandingPage(){
    return (
        <>
            <div className='text-center font-mono text-xl m-2'><h1>Admin Dashboard</h1></div>
            <div className='grid grid-cols-1 place-items-center'>
                <RegisterForm/>
                <LoginForm/>
            </div>

        </>
    )
}

export default LandingPage