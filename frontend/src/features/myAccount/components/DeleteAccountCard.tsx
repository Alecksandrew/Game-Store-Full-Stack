import { useEffect, useState } from "react";
import { PAGE_ROUTES } from "@/global/constants/FRONTEND_URL";
import { Form } from "@/global/components/Form";
import { Button } from "@/global/components/Button";
import { Modal } from "@/global/components/Modal";
import { useDeleteAccount } from "../hooks/useMyAccount";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleDeleteAccount,
    warningComponent,
    isLoading,
    data,
  } = useDeleteAccount();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    handleDeleteAccount();
  };

  useEffect(() => {
    if (data) {
      //data means response from API when the result is successful
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
      window.location.href = PAGE_ROUTES.STORE.HOME;
    }
  }, [data]);

  return (
    <>
       <Modal.Preset.Confirmation
        isOpen={isModalOpen}
        title="Delete account"
        message="Are you sure you want to delete your account? All your data will be permanently lost. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onClose={handleCloseModal}
        isLoading={isLoading}
        confirmButtonText={isLoading ? "Deleting..." : "Yes, Delete account"}
      />


      {warningComponent}

      <Form.Root onSubmit={() => {}} className="h-[450px]">
        <Form.Header
          title="Danger zone"
          subtitle="Irreversible actions that permanently affect your account"
          divClassName="mb-0"
        />

        <Form.Body>
          <div className="bg-bg-primary p-4 rounded-md border border-danger/50 w-full text-center">
            <p className="text-text-secondary">
              Please note: This action is permanent and cannot be undone. All your
              data will be deleted, including purchases, wishlists, and history.
            </p>
          </div>
        </Form.Body>

        <Form.Actions>
          <Button
            type="button"
            onClick={handleOpenModal}
            disabled={isLoading}
            className="bg-danger"
          >Delete my account</Button>
        </Form.Actions>
      </Form.Root>
    </>
  );
}
