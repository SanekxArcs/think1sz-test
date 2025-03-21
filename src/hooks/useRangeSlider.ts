import { useState, useEffect, useCallback } from 'react';
import { UseRangeSliderOptions, UseRangeSliderResult } from '../types/hooks';

export function useRangeSlider({
  min,
  max,
  value,
  onChange
}: UseRangeSliderOptions): UseRangeSliderResult {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [valueChanged, setValueChanged] = useState(false);

  const safePercentage = Math.max(
    2,
    Math.min(97, ((value - min) / (max - min)) * 100)
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
    setValueChanged(true);
  }, [onChange]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    setShowTooltip(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (!showTooltip && !valueChanged) setShowTooltip(false);
  }, [showTooltip, valueChanged]);

  const handleMouseEnter = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging && !valueChanged) {
      setShowTooltip(false);
    }
  }, [isDragging, valueChanged]);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        if (!valueChanged) {
          setShowTooltip(false);
        }
      };

      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("touchend", handleGlobalMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleGlobalMouseUp);
        window.removeEventListener("touchend", handleGlobalMouseUp);
      };
    }
  }, [isDragging, valueChanged]);

  return {
    showTooltip,
    isDragging,
    valueChanged,
    safePercentage,
    handleChange,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave
  };
}
