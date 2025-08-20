import { useState } from "react";

import RegisterForm from "../components/RegisterForm"; 
import Toggle from "../../../components/Toggle";


export default function AuthPage(){
    const [toggleState, setToggleState] = useState<'login' | 'register'>('register');

    return (
        <div className="bg-bg-primary h-screen w-screen flex justify-center items-center">
            <div>
                <Toggle activeOption={toggleState} onOptionChange={setToggleState}/>
                {toggleState === "register" ? <RegisterForm className="w-full"/> : null}
            </div>
        </div>
    );
}