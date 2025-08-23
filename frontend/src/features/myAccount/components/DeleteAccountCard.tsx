import { useEffect, useState } from "react";
import Button from "@/global/components/Button";
import FormHeader from "@/global/components/FormHeader";
import ConfirmationModal from "./ConfirmationModal";

import { useDeleteAccount } from "../hooks/useDeleteAccount";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { 
    execute: deleteAccount, 
    warningComponent, 
    isLoading, 
    data
  } = useDeleteAccount();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    deleteAccount();
  };

  useEffect(() => {
    if (data) {//data means response from API when the result is successful
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/"; 
    }
  }, [data]); 

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          title="Delete account"
          message="Are you sure you want to delete your account? All your data will be permanently lost. This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseModal}
          isLoading={isLoading}
          confirmButtonText={isLoading ? "Deleting..." : "Yes, Delete account"}
        />
      )}

     {warningComponent}


      <div className="form h-[450px]">
        <FormHeader
          title="Danger zone"
          subTitle="Irreversible actions that permanently affect your account"
          className="mb-0"
        />

        <div className="bg-bg-primary p-4 rounded-md border border-danger/50 w-full text-center">
          <p className="text-text-secondary">
            Please note: This action is permanent and cannot be undone. All
your data will be deleted, including purchases, wishlists, and
history.
          </p>
        </div>

        <div className="w-full mt-4">

          <Button
            title="Excluir Minha Conta"
            type="button"
            onClick={handleOpenModal}
            disabled={isLoading}
            className="bg-danger"
          />
        </div>
      </div>
    </>
  );
}