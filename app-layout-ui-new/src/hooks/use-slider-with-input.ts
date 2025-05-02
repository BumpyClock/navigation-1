import * as React from "react";

interface UseSliderWithInputProps {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export function useSliderWithInput({
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: UseSliderWithInputProps = {}) {
  const [value, setValue] = React.useState(defaultValue);
  
  const handleSliderChange = React.useCallback(
    (newValue: number[]) => {
      const clampedValue = Math.max(min, Math.min(max, newValue[0]));
      setValue(clampedValue);
      onChange?.(clampedValue);
    },
    [min, max, onChange]
  );

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = parseFloat(event.target.value);
      if (!isNaN(inputValue)) {
        const clampedValue = Math.max(min, Math.min(max, inputValue));
        setValue(clampedValue);
        onChange?.(clampedValue);
      }
    },
    [min, max, onChange]
  );

  return {
    value,
    sliderValue: [value],
    setValue,
    handleSliderChange,
    handleInputChange,
    min,
    max,
    step,
  };
}