import DeleteAccount from "../components/DeleteAccountCard";
import LogoutAccount from "../components/LogoutAccount";
import PersonalInfoCard from "../components/PersonalInfoCard";
import UpdatePasswordForm from "../components/UpdatePasswordForm";


export default function MyAccountPage(){


    return(
        <div className="relative bg-bg-primary min-h-screen w-screen flex flex-col justify-center items-center mx-auto py-10">
            <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale-100 bg-[url('../../../../public/the-witcher-3-bg.jpg')] blur-[2px]" /> {/*Background*/}
            <div className="relative z-10 w-4/5 max-w-[800px] flex flex-col gap-4">
                <PersonalInfoCard header={undefined} inputTitle={undefined}/>
                <UpdatePasswordForm/>
                <LogoutAccount/>
                <DeleteAccount/>
            </div>
            
        </div>
    );
}