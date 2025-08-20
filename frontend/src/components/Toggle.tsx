import Button from "./Button";

type ToggleProps = {
  activeOption: 'login' | 'register';
  onOptionChange: (option: 'login' | 'register') => void;
};

export default function Toggle({ activeOption, onOptionChange }: ToggleProps) {
    
  const loginClasses = activeOption === 'login' ? '' : 'opacity-50';
  const registerClasses = activeOption === 'register' ? '' : 'opacity-50';

  return (
    <div className="flex">
      <Button
        title="Log in"
        type="button"
        className={loginClasses} 
        onClick={() => onOptionChange('login')}
      />
      <Button
        title="Register"
        type="button"
        className={registerClasses} 
        onClick={() => onOptionChange('register')}
      />
    </div>
  );
}