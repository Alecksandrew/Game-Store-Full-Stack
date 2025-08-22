import { useEffect, useState } from "react";
import FormHeader from "../../../components/FormHeader";
import InputOnlyDisplayInfo from "../../../components/InputOnlyDisplayInfo";
import { fetchWithAuth } from "../../../services/fetchWithAuth";
import { MYACCOUNT_URL } from "../../../BACKEND_URL";

type userDataType = {
  userName: string;
  email: string;
};

const emptyUserData = {
  userName: "",
  email: "",
};

export default function PersonalnfoCard() {
  const [userData, setUserData] = useState<userDataType>(emptyUserData);

  useEffect(() => {
    async function getUserInfos() {
      try {
        const response = await fetchWithAuth(MYACCOUNT_URL, {
          method: "GET",
        });

        console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUserInfos();
  }, []);

  return (
    <form className="form h-[400px] max-h-fit">
      <FormHeader
        title="Profile informations"
        subTitle="Your basic personal informations"
      />
      <InputOnlyDisplayInfo
        title="User name"
        inputValue={userData?.userName}
        disabled={true}
      />
      <InputOnlyDisplayInfo
        title="E-mail"
        inputValue={userData?.email}
        disabled={true}
      />
    </form>
  );
}
