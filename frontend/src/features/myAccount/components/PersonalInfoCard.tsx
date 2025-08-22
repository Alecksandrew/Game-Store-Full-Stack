import FormHeader from "../../../components/FormHeader";
import InputOnlyDisplayInfo from "../../../components/InputOnlyDisplayInfo";



export default function PersonalnfoCard ({header, inputTitle}) {



    return (
        <form className="form h-[400px] max-h-fit">
            <FormHeader title="Profile informations" subTitle="Your basic personal informations" />
            <InputOnlyDisplayInfo title="User name" inputValue="emailtest@gmail.com" disabled={true} />
            <InputOnlyDisplayInfo title="E-mail" inputValue="emailtest@gmail.com" disabled={true}/>        
        </form>
    );

}