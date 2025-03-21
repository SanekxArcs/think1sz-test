import { NextResponse } from "next/server";
import { Holiday } from "../../../types/forms";

type HolidayType = "NATIONAL_HOLIDAY" | "OBSERVANCE";

interface FormattedHoliday extends Holiday {
  type: HolidayType;
}

export async function GET() {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API_KEY is not defined in environment variables");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    const country = "PL";

    const nationalHolidaysPromise = fetch(
      `https://api.api-ninjas.com/v1/holidays?country=${country}&type=national_holiday`,
      {
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const observancesPromise = fetch(
      `https://api.api-ninjas.com/v1/holidays?country=${country}&type=observance`,
      {
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const [nationalResponse, observanceResponse] = await Promise.all([
      nationalHolidaysPromise,
      observancesPromise,
    ]);

    if (!nationalResponse.ok) {
      throw new Error(
        `National holidays API request failed with status ${nationalResponse.status}`
      );
    }

    if (!observanceResponse.ok) {
      throw new Error(
        `Observances API request failed with status ${observanceResponse.status}`
      );
    }

    const nationalHolidays = await nationalResponse.json();
    const observances = await observanceResponse.json();

    const formattedNationalHolidays: FormattedHoliday[] = nationalHolidays.map(
      (holiday: Holiday) => ({
        ...holiday,
        type: "NATIONAL_HOLIDAY",
      })
    );

    const formattedObservances: FormattedHoliday[] = observances.map(
      (holiday: Holiday) => ({
        ...holiday,
        type: "OBSERVANCE",
      })
    );

    const allHolidays = [...formattedNationalHolidays, ...formattedObservances];
    console.log("Fetched holidays:", allHolidays);

    return NextResponse.json(allHolidays);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch holidays",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
