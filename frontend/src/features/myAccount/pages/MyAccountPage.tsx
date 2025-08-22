import PersonalInfoCard from "../components/PersonalInfoCard";
import UpdatePasswordForm from "../components/UpdatePasswordForm";


export default function MyAccountPage(){


    return(
        <>
            <PersonalInfoCard header={undefined} inputTitle={undefined}/>
            <UpdatePasswordForm/>
        </>
    );
}