import type { InputHTMLAttributes, ReactElement } from "react"
import type { RegisterOptions } from "react-hook-form";

export interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    rules?: RegisterOptions; 
    icon?: ReactElement;
    type: string,
};