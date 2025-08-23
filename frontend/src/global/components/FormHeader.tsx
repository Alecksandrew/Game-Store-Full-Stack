type FormHeaderProps = {
    title: string,
    subTitle?:string,
    className?: string
}

export default function FormHeader({title, subTitle, className}:FormHeaderProps) {
  return (
    <div className={`text-text-primary text-center mb-6 ${className}`}>
      <h1 className="font-orbitron font-semibold text-4xl lg:text-5xl mb-1">
        {title}
      </h1>
      <p className="font-inter font-light lg:text-xl">
        {subTitle}
      </p>
    </div>
  );
}
