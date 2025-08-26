import Form from "@/global/components/Form";
import { Input } from "@/global/components/Input";






export default function SearchGameForm(){

    return (
        <div className="bg-bg-secondary outline-2 outline-primary rounded min-w-[320px] w-full p-4 mx-auto">
            <Form submitText="Apply filters" onSubmit={(data)=> console.log(data)} >
                <Input label="Search Games" name="gameName"/>
            </Form>
        </div>
    )
}