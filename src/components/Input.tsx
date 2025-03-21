import React from "react";
import RequiredLabel from "./RequiredLabel";
import ErrorMessage from "./ErrorMessage";
import { InputProps } from "../types/components";

export default function Input({
  label,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  type = "text",
  required = false,
  error,
  validateOnBlur = false,
}: InputProps) {
  const errorId = `${name}-error`;
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validateOnBlur && onBlur) {
      onBlur(e);
    } else if (onBlur) {
      onBlur(e);
    }
  };
  
  return (
    <div className="space-y-1">
      <RequiredLabel
        text={label}
        forId={name}
        required={required && error ? true : false}
      />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        className={`w-full px-4 py-2.5 ring bg-white ${
          error ? "ring-2 ring-error bg-error/10" : "ring-inactive"
        } rounded-lg focus:outline-none focus:ring-2 text-base focus:ring-primary flex h-12 border-input transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50`}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        aria-required={required ? "true" : "false"}
        data-filled={value ? "true" : "false"}
      />
      <ErrorMessage error={error} id={errorId} />
    </div>
  );
}
