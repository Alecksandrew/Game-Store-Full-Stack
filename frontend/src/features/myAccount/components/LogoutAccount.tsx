
import { Button } from "@/global/components/Button";
import { useLogout } from "../../auth/hooks/useAuth";




export default function LogoutAccount(){
    const {execute: executeLogout} = useLogout();

    return(
        <div className="bg-bg-primary p-6 rounded-lg border border-border">
        <div className="text-center mb-6">
            <h2 className="font-orbitron font-semibold text-2xl text-text-primary mb-2">
                Logout
            </h2>
            <p className="font-inter font-light text-text-secondary">
                Disconnect from your current session
            </p>
        </div>
        
        <div className="flex justify-center">
            <Button 
                type="button" 
                onClick={() => executeLogout()}
                className="bg-danger hover:bg-danger/80"
            >Logout from my account</Button>
        </div>
    </div>
    );
}