import { useState, useEffect, useRef } from "react";
import RequiredLabel from "./RequiredLabel";
import ErrorMessage from "./ErrorMessage";
import { CalendarProps } from "../types/components";
import { CalendarDay, Holiday } from "../types/forms";

function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth
}: {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  return (
    <div className="flex justify-between items-center p-3">
      <button
        type="button"
        onClick={onPrevMonth}
        className="hover:cursor-pointer group"
        aria-label={`Previous month: ${new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1).toLocaleString("default", { month: "long" })} ${currentMonth.getFullYear()}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="14"
          viewBox="0 0 11 14"
          className="fill-inactive group-hover:fill-hover"
          aria-hidden="true"
        >
          <path d="M0.499999 7.86602C-0.166668 7.48112 -0.166667 6.51887 0.5 6.13397L9.5 0.937821C10.1667 0.552921 11 1.03405 11 1.80385L11 12.1962C11 12.966 10.1667 13.4471 9.5 13.0622L0.499999 7.86602Z" />
        </svg>
      </button>

      <h3 className="font-medium select-none" aria-live="polite">
        {currentMonth.toLocaleString("default", { month: "long" })}{" "}
        {currentMonth.getFullYear()}
      </h3>

      <button
        type="button"
        onClick={onNextMonth}
        className="hover:cursor-pointer group"
        aria-label={`Next month: ${new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1).toLocaleString("default", { month: "long" })} ${currentMonth.getFullYear()}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="14"
          viewBox="0 0 11 14"
          className="fill-inactive group-hover:fill-hover rotate-180"
          aria-hidden="true"
        >
          <path d="M0.499999 7.86602C-0.166668 7.48112 -0.166667 6.51887 0.5 6.13397L9.5 0.937821C10.1667 0.552921 11 1.03405 11 1.80385L11 12.1962C11 12.966 10.1667 13.4471 9.5 13.0622L0.499999 7.86602Z" />
        </svg>
      </button>
    </div>
  );
}

function CalendarDayHeaders() {
  const getDayName = (day: number) => {
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return days[day];
  };

  return (
    <div className="grid grid-cols-7 select-none text-center text-small font-medium" role="row">
      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
        <div key={day} className="py-2" role="columnheader" aria-label={getDayName(day)}>
          {getDayName(day)}
        </div>
      ))}
    </div>
  );
}

function CalendarGrid({
  days,
  formatDate,
  selectedDate,
  currentMonth,
  onDateClick,
  onKeyboardNav,
  calendarRef,
}: {
  days: CalendarDay[];
  formatDate: (date: Date) => string;
  selectedDate: string;
  currentMonth: Date;
  onDateClick: (day: CalendarDay) => void;
  onKeyboardNav: (
    e: React.KeyboardEvent,
    day: CalendarDay,
    index: number
  ) => void;
  calendarRef: React.RefObject<HTMLDivElement | null>;
}) {
  const firstValidDayIndex = days.findIndex((day) => day.date !== null);
  const selectedDayIndex = days.findIndex(
    (day) => day.date && formatDate(day.date) === selectedDate
  );

  return (
    <div
      className="grid grid-cols-7 place-items-center gap-px"
      role="grid"
      ref={calendarRef}
    >
      {days.map((day, idx) => {
        const isFocusable =
          day.date !== null &&
          (idx === selectedDayIndex ||
            (selectedDayIndex === -1 && idx === firstValidDayIndex));

        return (
          <div
            key={idx}
            onClick={() => day.date && onDateClick(day)}
            onKeyDown={(e) => onKeyboardNav(e, day, idx)}
            className={`
              aspect-square transition-all w-8 h-8 flex rounded-full items-center justify-center
              ${
                day.disabled && !day.holiday
                  ? "text-inactive cursor-not-allowed"
                  : "cursor-pointer"
              }
              ${
                day.holiday?.type === "NATIONAL_HOLIDAY"
                  ? "text-inactive font-medium"
                  : ""
              }
              ${day.isObservance ? "text-inactive" : ""} 
              ${
                selectedDate === (day.date ? formatDate(day.date) : "")
                  ? "bg-primary text-white"
                  : ""
              }
            `}
            role={day.date ? "gridcell" : "presentation"}
            tabIndex={isFocusable ? 0 : -1}
            aria-selected={
              day.date && selectedDate === formatDate(day.date)
                ? "true"
                : "false"
            }
            aria-disabled={day.disabled && !day.holiday ? "true" : "false"}
            aria-label={
              day.date
                ? `${day.date.getDate()} ${currentMonth.toLocaleString(
                    "default",
                    { month: "long" }
                  )} ${currentMonth.getFullYear()}${
                    day.holiday ? `, ${day.holiday.name}` : ""
                  }`
                : "Empty cell"
            }
            data-idx={idx}
          >
            {day.date ? day.date.getDate() : ""}
          </div>
        );
      })}
    </div>
  );
}

function HolidayInfo({ holiday }: { holiday: Holiday | null }) {
  if (!holiday) return null;
  
  return (
    <div 
      className="mt-2 absolute left-0 -bottom-6 flex items-center space-x-2 animate-fade-in" 
      aria-live="polite"
      role="status"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="fill-inactive inline-block mr-2"
        aria-hidden="true"
      >
        <path
          d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.88029 9.09734 8.80664 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13305 9.09734 7.08279 8.97602C7.03254 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8068C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83113 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82743 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z"
        />
      </svg>
      <p>It is {holiday.name}.</p>
    </div>
  );
}

export default function Calendar({
  onSelectDate,
  holidays,
  error,
}: CalendarProps) {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedHolidayInfo, setSelectedHolidayInfo] = useState<Holiday | null>(null);
  const calendarId = "calendar";
  const errorId = "date-error";
  const calendarGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    const todayString = formatDate(today);
    const todayHoliday = holidays.find((h) => h.date === todayString);

    if (selectedDate === "") {
      setSelectedDate(todayString);
      onSelectDate(
        todayString,
        todayHoliday && todayHoliday.type === "OBSERVANCE" ? todayHoliday : null
      );
    }
  }, [holidays, onSelectDate, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const [year, month] = selectedDate.split("-").map(Number);
      setCurrentMonth(new Date(year, month - 1, 1));
    }
  }, [selectedDate]);

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days: CalendarDay[] = [];

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ date: null, disabled: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDate(date);
      const isSunday = date.getDay() === 0;
      const holiday = holidays.find((h) => h.date === dateString);
      const isObservance = holiday ? holiday.type === "OBSERVANCE" : false;

      days.push({
        date,
        disabled: isSunday,
        isObservance,
        holiday,
      });
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleDateClick = (day: CalendarDay) => {
    if (!day.date || (day.disabled && !day.holiday)) return;

    const dateString = formatDate(day.date);
    setSelectedDate(dateString);

    const isHoliday = day.holiday?.type === "NATIONAL_HOLIDAY" || day.disabled;
    
    if (isHoliday) {
      const holidayInfo = day.holiday || {
        name: "Sunday",
        date: dateString,
        type: "NATIONAL_HOLIDAY"
      };
      
      setSelectedHolidayInfo(holidayInfo);
      onSelectDate(dateString, holidayInfo);
    } else if (day.holiday?.type === "OBSERVANCE") {
      setSelectedHolidayInfo(day.holiday);
      onSelectDate(dateString, day.holiday);
    } else {
      setSelectedHolidayInfo(null);
      onSelectDate(dateString, null);
    }
  };

  const handleKeyboardNavigation = (e: React.KeyboardEvent, day: CalendarDay, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        navigateToNextDay(index, 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        navigateToNextDay(index, -1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateToNextDay(index, -7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateToNextDay(index, 7);
        break;
      case 'Home':
        e.preventDefault();
        navigateToFirstDay();
        break;
      case 'End':
        e.preventDefault();
        navigateToLastDay();
        break;
      case 'PageDown':
        e.preventDefault();
        nextMonth();
        break;
      case 'PageUp':
        e.preventDefault();
        prevMonth();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (day.date) {
          handleDateClick(day);
        }
        break;
      default:
        break;
    }
  };

  const navigateToNextDay = (currentIndex: number, step: number) => {
    if (!calendarGridRef.current) return;
    
    const days = getDaysInMonth(currentMonth);
    let nextIndex = currentIndex + step;
    
    if (nextIndex < 0 || nextIndex >= days.length) return;
    
    while (nextIndex >= 0 && nextIndex < days.length && !days[nextIndex].date) {
      nextIndex += Math.sign(step);
    }
    
    if (nextIndex >= 0 && nextIndex < days.length && days[nextIndex].date) {
      const dataIdxCells = calendarGridRef.current.querySelectorAll(`[data-idx="${nextIndex}"]`);
      
      if (dataIdxCells.length > 0) {
        const cellToFocus = dataIdxCells[0] as HTMLElement;
        cellToFocus.tabIndex = 0;
        cellToFocus.focus();
        
        if (days[nextIndex].date) {
          handleDateClick(days[nextIndex]);
        }
      }
    }
  };

  const navigateToFirstDay = () => {
    const days = getDaysInMonth(currentMonth);
    const firstValidIndex = days.findIndex(day => day.date !== null);
    if (firstValidIndex >= 0) {
      navigateToNextDay(firstValidIndex, 0);
    }
  };
  
  const navigateToLastDay = () => {
    const days = getDaysInMonth(currentMonth);
    const lastValidIndex = [...days].reverse().findIndex(day => day.date !== null);
    if (lastValidIndex >= 0) {
      const actualIndex = days.length - 1 - lastValidIndex;
      navigateToNextDay(actualIndex, 0);
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="space-y-1 w-full lg:w-80 relative">
      <RequiredLabel text="Date" required={!!error} forId={calendarId} />

      <div 
        className="border border-inactive rounded-lg bg-white p-6 w-full" 
        id={calendarId} 
        aria-describedby={error ? errorId : undefined}
      >
        <CalendarHeader 
          currentMonth={currentMonth} 
          onPrevMonth={prevMonth} 
          onNextMonth={nextMonth} 
        />
        
        <CalendarDayHeaders />
        
        <CalendarGrid 
          days={days} 
          formatDate={formatDate}
          selectedDate={selectedDate}
          currentMonth={currentMonth}
          onDateClick={handleDateClick}
          onKeyboardNav={handleKeyboardNavigation}
          calendarRef={calendarGridRef}
        />
      </div>
      
      <HolidayInfo holiday={selectedHolidayInfo} />

      <ErrorMessage error={error} id={errorId} />
    </div>
  );
}
