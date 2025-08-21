import type { ReactNode } from "react"

type FormWrapperProps = {
    children: ReactNode
}

export default function FormWrapper({children}:FormWrapperProps){

    return(
    <div className="relative bg-bg-primary h-screen w-screen flex justify-center items-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale-100 bg-[url('../../../../public/the-witcher-3-bg.jpg')] blur-[2px]" /> {/*Background*/}
          <div className="relative z-10 min-w-[325px] w-1/2 max-w-[600px]">
            {children}
          </div>
        </div>)
}