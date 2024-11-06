import { FC, memo } from "react";
import { Manufacturer } from "../../types/Manufacturer";

interface RadioButtonGroupProps {
  options: Manufacturer[];
  selectedOption: string;
  onChange: (optionId: string) => void;
  error?: string | null;
  clearError?: () => void;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  options,
  selectedOption,
  onChange,
  error = null,
  clearError,
}) => {
  const handleClick = (optionId: string) => {
    onChange(optionId);
    if (clearError) clearError();
  };

  return (
    <div className={"grid grid-cols-3 gap-[10px] mt-[20px] px-[10px]"}>
      {options.map((option) => (
        <label
          key={option.id}
          className={`text-[16px] flex items-center gap-[10px] ${
            error ? "text-red-500" : "text-custom-black"
          }`}
          onClick={clearError}
        >
          <input
            type="radio"
            name="manufacturer"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => onChange(option.id)}
            onFocus={clearError}
            className="hidden"
          />
          <div
            className={`border-[3px] rounded-full border-transparent hover:border-black hover:border-opacity-[8%]  duration-300 ${
              error && "hover:border-custom-error hover:border-opacity-30"
            }`}
          >
            <span
              className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center cursor-pointer ${
                error ? "border-red-500" : "border-custom-base-300"
              } ${
                selectedOption === option.id
                  ? "bg-white border border-custom-primary "
                  : "bg-white"
              }`}
              onClick={() => handleClick(option.id)}
            >
              {selectedOption === option.id && (
                <span className="w-[10px] h-[10px] bg-custom-primary rounded-full"></span>
              )}
            </span>
          </div>

          {option.name}
        </label>
      ))}
    </div>
  );
};

export default memo(RadioButtonGroup);
