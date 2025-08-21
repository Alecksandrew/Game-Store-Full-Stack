type FormHeaderProps = {
    title: string,
    subTitle?:string
}

export default function FormHeader({title, subTitle}:FormHeaderProps) {
  return (
    <div className="text-text-primary text-center mb-4">
      <h1 className="font-orbitron font-semibold text-4xl lg:text-5xl mb-1">
        {title}
      </h1>
      <p className="font-inter font-light lg:text-xl">
        {subTitle}
      </p>
    </div>
  );
}
