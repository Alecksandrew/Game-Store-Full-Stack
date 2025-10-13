import { useContext } from "react";
import { MyAccountContext } from "../context/MyAccountContext";
import { DisplayField } from "@/global/components/DisplayField";

export default function PersonalnfoCard() {
  const { myAccountData, isLoading } = useContext(MyAccountContext);


  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="bg-bg-primary p-6 rounded-lg border border-border">
    <div className="text-center mb-6">
      <h2 className="font-orbitron font-semibold text-2xl text-text-primary mb-2">
        Profile informations
      </h2>
      <p className="font-inter font-light text-text-secondary">
        Your basic personal informations
      </p>
    </div>
    
    <div className="space-y-4">
      <DisplayField
        title="User name"
        value={myAccountData?.userName ?? "Not found"}
      />
      <DisplayField
        title="E-mail"
        value={myAccountData?.email ?? "Not found"}
      />
    </div>
  </div>
  );
}
