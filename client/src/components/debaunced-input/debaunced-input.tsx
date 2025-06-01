import { useEffect, useState } from "react";

type Props = {
  value?: string;
  delay?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const DebouncedInput = ({
  value = "",
  delay = 500,
  onChange,
  placeholder,
  className,
}: Props) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(internalValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [internalValue, delay, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  return (
    <input
      type="text"
      className={className}
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
