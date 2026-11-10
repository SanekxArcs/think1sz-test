import { Holiday } from "../types/forms";
import { getPolishHolidays } from "../lib/holidays";

// Computed once per page load; a stable reference keeps effects that depend on it quiet.
const currentYear = new Date().getFullYear();
const HOLIDAYS: Holiday[] = Array.from({ length: 12 }, (_, i) =>
  getPolishHolidays(currentYear - 1 + i)
).flat();

export function useHolidays() {
  return {
    holidays: HOLIDAYS,
    isLoading: false,
    isError: undefined,
  };
}
