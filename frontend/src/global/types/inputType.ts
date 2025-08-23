import type { InputHTMLAttributes, ReactElement } from "react"

export interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    icon?: ReactElement;
    errorMessage?: string;
};