import type { InputHTMLAttributes, ReactElement } from "react"
import type { RegisterOptions } from "react-hook-form";

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    rules?: RegisterOptions; 
    icon?: ReactElement;
};