import RegisterForm from "./features/auth/components/RegisterForm";
import { Warning } from "./components/Warning";
import "./App.css";

export default function App() {
  return (
    <>
    <RegisterForm/>
    <Warning message="teste de mensagem de erro, vamos ver se esta bom no momento!" type="error" onClose={()=> 1}/>
    </>
      
  );
}
