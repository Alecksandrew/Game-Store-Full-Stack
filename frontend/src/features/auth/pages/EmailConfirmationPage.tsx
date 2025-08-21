import { Link } from "react-router";
import FormWrapper from "../components/FormWrapper";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";
import { FadeLoader } from "react-spinners";

export default function EmailConfirmationPage() {
  const { status, message } = useEmailConfirmation();

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <>
            <h1 className=" font-semibold text-3xl font-orbitron text-primary">Success!</h1>
            <p className="text-text-primary mt-2">{message}</p>
            <Link to="/" className="mt-4 bg-primary text-text-primary font-semibold p-2 rounded w-1/2 text-center">
              Go to Login
            </Link>
          </>
        );
      case "error":
        return (
          <>
            <h1 className="font-semibold text-3xl font-orbitron text-danger">Error!</h1>
            <p className="text-text-primary mt-2">{message}</p>
            <Link to="/" className="mt-4 bg-primary text-text-primary font-semibold p-2 rounded w-1/2 text-center">
              Back to Home
            </Link>
          </>
        );
      case "confirming":
      default:
        return (
          <>
            <h1 className=" font-semibold text-3xl font-orbitron text-text-primary">Confirming...</h1>
            <p className="text-text-secondary mt-2">{message}</p>
            <FadeLoader color="#05080f"/>
          </>
        );
    }
  };

  return (
    <FormWrapper>
      <div className="flex flex-col justify-center items-center text-center gap-4 p-6 bg-bg-secondary min-h-[300px] rounded border-1 border-primary">
        {renderContent()}
      </div>
    </FormWrapper>
  );
}