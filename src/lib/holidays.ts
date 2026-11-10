import { Holiday } from "../types/forms";

// Polish holidays computed in the browser, so the site needs no API route.
// Replaces the former /api/holidays proxy to API Ninjas.

const pad = (n: number) => String(n).padStart(2, "0");

const toDateString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Anonymous Gregorian algorithm (Meeus/Jones/Butcher)
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export function getPolishHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  const fixed = (month: number, day: number) => new Date(year, month - 1, day);

  const national: [Date, string][] = [
    [fixed(1, 1), "New Year's Day"],
    [fixed(1, 6), "Epiphany"],
    [easter, "Easter Sunday"],
    [addDays(easter, 1), "Easter Monday"],
    [fixed(5, 1), "Labour Day"],
    [fixed(5, 3), "Constitution Day"],
    [addDays(easter, 49), "Whit Sunday"],
    [addDays(easter, 60), "Corpus Christi"],
    [fixed(8, 15), "Assumption of Mary"],
    [fixed(11, 1), "All Saints' Day"],
    [fixed(11, 11), "Independence Day"],
    [fixed(12, 25), "Christmas Day"],
    [fixed(12, 26), "Second Day of Christmas"],
  ];
  // Christmas Eve is a public holiday in Poland since 2025
  if (year >= 2025) national.push([fixed(12, 24), "Christmas Eve"]);

  const observances: [Date, string][] = [
    [fixed(1, 21), "Grandmother's Day"],
    [fixed(1, 22), "Grandfather's Day"],
    [fixed(2, 14), "Valentine's Day"],
    [addDays(easter, -52), "Fat Thursday"],
    [fixed(3, 8), "Women's Day"],
    [addDays(easter, -2), "Good Friday"],
    [addDays(easter, -1), "Holy Saturday"],
    [fixed(5, 2), "Flag Day"],
    [fixed(5, 26), "Mother's Day"],
    [fixed(6, 1), "Children's Day"],
    [fixed(6, 23), "Father's Day"],
    [fixed(11, 2), "All Souls' Day"],
    [fixed(11, 30), "St. Andrew's Day"],
    [fixed(12, 6), "St. Nicholas Day"],
    [fixed(12, 31), "New Year's Eve"],
  ];
  if (year < 2025) observances.push([fixed(12, 24), "Christmas Eve"]);

  const format = (type: string) => ([date, name]: [Date, string]): Holiday => ({
    country: "Poland",
    iso: "PL",
    year,
    date: toDateString(date),
    name,
    type,
  });

  return [
    ...national.map(format("NATIONAL_HOLIDAY")),
    ...observances.map(format("OBSERVANCE")),
  ];
}
