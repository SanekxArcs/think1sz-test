import * as React from "react";
import { ButtonProps } from "../types/components";

export default function Button({
  label,
  type = "button",
  onClick,
  success = false,
  isLoading = false,
  disabled = true,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      title={disabled ? "Please fill out the form" : "Submit the form"}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-4 py-3 bg-primary transition-colors text-white font-medium rounded-lg hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hover disabled:bg-inactive select-none disabled:cursor-not-allowed ${className}`}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-live={success ? "polite" : "off"}
    >
      {isLoading ? (
        <span className="flex gap-2 items-centerjustify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="32"
            height="32"
            className="animate-spin"
            aria-hidden="true"
          >
            <g data-idx="1">
              <circle
                strokeDasharray="164.93361431346415 56.97787143782138"
                r="35"
                strokeWidth="10"
                stroke="white"
                fill="none"
                cy="50"
                cx="50"
                data-idx="2"
                transform="matrix(0.7705091007063691,-0.6374289966173976,0.6374289966173976,0.7705091007063691,-20.396904866188336,43.34599479555142)"
              ></circle>
              <g data-idx="4"></g>
            </g>
          </svg>
          <span>Processing...</span>
        </span>
      ) : success ? (
        <span>Successfully submitted!</span>
      ) : (
        label
      )}
    </button>
  );
}
