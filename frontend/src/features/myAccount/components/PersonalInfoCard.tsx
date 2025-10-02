import { useContext } from "react";
import FormHeader from "@/global/components/FormHeader";
import InputOnlyDisplayInfo from "@/global/components/InputOnlyDisplayInfo";

import { MyAccountContext } from "../context/MyAccountContext";


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
      <InputOnlyDisplayInfo
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
