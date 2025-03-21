import ErrorMessage from "./ErrorMessage";
import RequiredLabel from "./RequiredLabel";
import { TimeSlotsProps } from "../types/components";

export default function TimeSlots({
  onSelectTime,
  selectedTime,
  error,
}: TimeSlotsProps) {
  const timeSlots = ["12:00", "14:00", "16:30", "18:30", `20:00`];
  const timeSlotsId = "time-slots";
  const errorId = "time-error";

  return (
    <div className="space-y-1 animate-fade-in">
      
      <RequiredLabel text="Time" required={error ? true : false} forId={timeSlotsId} />

      <div 
        className="grid grid-cols-4 lg:grid-rows-4 lg:grid-cols-1 gap-2"
        role="radiogroup"
        aria-labelledby={timeSlotsId}
        aria-describedby={error ? errorId : undefined}
        aria-required="true"
      >
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => onSelectTime(time)}
            className={`
              py-3 px-4 select-none cursor-pointer bg-white font-medium rounded-lg ring hover:ring-hover ring-inactive
              ${selectedTime === time ? "ring-2 ring-primary" : ""}`}
            role="radio"
            aria-checked={selectedTime === time}
            aria-label={`Select ${time} time slot`}
          >
            {time}
          </button>
        ))}
      </div>

      <ErrorMessage error={error} id={errorId} />
    </div>
  );
}
