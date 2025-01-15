import { cn } from "../lib/utils";

export default function TextArea({...props}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
        {...props}
        className={cn(
            `w-full p-3 rounded-xl text-white bg-background-secondary placeholder:text-content-placeholder
            border border-transparent hover:border-border-secondary hover:text-content-body active:border-border-tertiary`,
            props.className
        )} 
        />
    )
}