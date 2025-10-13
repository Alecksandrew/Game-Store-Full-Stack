import { useContext } from "react";
import FormHeader from "@/global/components/Form/components/FormHeader";

import { MyAccountContext } from "../context/MyAccountContext";
import DisplayField from "@/global/components/DisplayField/DisplayField";


export default function PersonalnfoCard() {
  const { myAccountData, isLoading } = useContext(MyAccountContext);


  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  return (
    <form className="form h-[400px] max-h-fit">
      <FormHeader
        title="Profile informations"
        subTitle="Your basic personal informations"
      />
      <DisplayField
        title="User name"
        inputValue={myAccountData?.userName ?? "Not found"}
        disabled={true}
      />
      <InputOnlyDisplayInfo
        title="E-mail"
        inputValue={myAccountData?.email ?? "Not found"}
        disabled={true}
      />
    </form>
  );
}
