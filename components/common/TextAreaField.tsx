import { cn } from "@/lib/utils";
import { FieldErrors, Path, UseFormRegister, FieldValues } from "react-hook-form"

interface FormFieldProps<T extends FieldValues> {
    id: string;
    disabled?: boolean;
    placeholder: string;
    label?: string;
    inputClassNames?: string;
    register: UseFormRegister<T>;
    errors: FieldErrors;
}

const TextAreaField = <T extends FieldValues>({ id, disabled, placeholder, label, inputClassNames, register, errors }: FormFieldProps<T>) => {

    const message = errors[id] && errors[id]?.message as string

    return (<div>
        {label && <span className="block text-sm">{label}</span>}
        <textarea
            autoFocus
            autoComplete="off"
            id={id}
            disabled={disabled}
            placeholder={placeholder}
            {...register(id as Path<T>)}
            className={cn("w-full p-3 my-2 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700 min-h-28",
                errors[id] && "border-rose-400", inputClassNames)}
        />
        {message && <span className="text-sm text-rose-400">{message}</span>}
    </div>);
}

export default TextAreaField;