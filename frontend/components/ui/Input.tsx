import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export function Input({
  label,
  error,
  icon,
  inputSize = "md",
  className = "",
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  inputSize?: "md" | "lg";
}) {
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}

      <div className="field-wrap">
        {icon && <span>{icon}</span>}

        <input
          id={id}
          className={`input
            ${icon ? "input--icon" : ""}
            ${error ? "input--error" : ""}
            ${inputSize === "lg" ? "input--lg" : ""}
            ${className}`}
          {...props}
        />
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}