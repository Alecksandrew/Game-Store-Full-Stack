import Button from "@/global/components/Button";
import FormHeader from "@/global/components/Form/CompoundComponents/FormHeader";
import { useLogout } from "../../auth/hooks/useAuth";




export default function LogoutAccount(){
    const {execute} = useLogout();

    return(
        <div className="form h-[200px]">
            <FormHeader title="Logout" subTitle="Disconnect from your current session"/>
            <Button title="Logout from my account" type="button" onClick={execute}/>
        </div>
    );
}