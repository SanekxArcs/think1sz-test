import RequiredLabel from "./RequiredLabel";
import { useRangeSlider } from "../hooks/useRangeSlider";
import { RangeSliderProps } from "../types/components";

export default function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
}: RangeSliderProps) {
  const sliderId = `slider-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const {
    showTooltip,
    isDragging,
    valueChanged,
    safePercentage,
    handleChange,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave
  } = useRangeSlider({
    min,
    max, 
    value,
    onChange
  });

  return (
    <div className="mb-10 group">
      <RequiredLabel text={label} forId={sliderId} />

      <div className="relative">
        <div className="flex justify-between text-small px-1 -mb-2" aria-hidden="true">
          <span>{min}</span>
          <span>{max}</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="w-full h-1 bg-inactive rounded-lg appearance-none cursor-pointer accent-primary hover:accent-hever transition-colors"
            id={sliderId}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={`${value} years old`}
            aria-labelledby={`${sliderId}-label`}
          />
          
          <div
            className={`absolute top-8 text-xs transform transition-all ${
              isDragging ? "duration-0" : "duration-200"
            } -translate-x-1/2 
              ${
                showTooltip || isDragging || valueChanged
                  ? "opacity-100"
                  : "opacity-0"
              }
              `}
            style={{ left: `${safePercentage}%` }}
            aria-hidden="true"
          >
            <div className="relative">
              <div className="absolute left-1/2 bottom-full -translate-x-1/2 w-0 h-0">
                <div className="w-2 h-2 bg-primary rotate-45 transform origin-center border-t border-l border-inactive absolute -bottom-[3px] left-1/2 -translate-x-1/2 " />
              </div>
              <div className="absolute left-1/2 bottom-full -translate-x-1/2 w-0 h-0 z-50">
                <div className="w-2 h-2 bg-white rotate-45 transform origin-center absolute -bottom-[4.5px] left-1/2 -translate-x-1/2" />
              </div>
              <div className="bg-white ring-1 text-primary ring-inactive px-3.5 py-1 rounded-[4px] font-medium whitespace-nowrap">
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
