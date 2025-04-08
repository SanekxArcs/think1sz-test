import { ChangeEvent } from "react";
import { Holiday } from "./forms";

export interface TimeSlotsProps {
  onSelectTime: (time: string) => void;
  selectedTime: string;
  error?: string;
}

export interface RequiredLabelProps {
  text: string;
  forId?: string;
  required?: boolean;
}

export interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export interface InputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  validateOnBlur?: boolean;
}

export interface FileInputProps {
  label: string;
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | null;
}

export interface ErrorMessageProps {
  error?: string;
  id?: string;
}

export interface CalendarProps {
  onSelectDate: (date: string, holidayInfo: Holiday | null) => void;
  holidays: Holiday[];
  error?: string;
  isLoadingHolidays?: boolean;
}

export interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  success?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  id?: string;
}
