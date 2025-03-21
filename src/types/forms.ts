export interface FormDataType {
  name: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  date: string;
  timeSlot: string;
}

export interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  age?: string;
  photo?: string;
  date?: string;
  timeSlot?: string;
}

export interface Holiday {
  country?: string;
  iso?: string;
  year?: number;
  date: string;
  day?: string;
  name: string;
  type: string;
}

export interface CalendarDay {
  date: Date | null;
  disabled: boolean;
  isObservance?: boolean;
  holiday?: Holiday | null;
}
