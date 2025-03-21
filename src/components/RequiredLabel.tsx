import React from 'react';
import { RequiredLabelProps } from '../types/components';

const RequiredLabel: React.FC<RequiredLabelProps> = ({ text, required = false, forId }) => {
  return (
    <label 
      htmlFor={forId} 
      className="block select-none font-medium"
      id={forId ? `${forId}-label` : undefined}
    >
      {text}
      {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
      {required && <span className="sr-only">(required)</span>}
    </label>
  );
};

export default RequiredLabel;
