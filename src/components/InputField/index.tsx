import { ChangeEvent, FC, memo } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const InputField: FC<InputFieldProps> = memo(
  ({ label, name, value, placeholder, error, onChange, onFocus }) => (
    <div className="flex flex-col mb-[20px] flex-1">
      <label className="text-[14px] text-custom-black ml-[10px]">{label}</label>

      <div
        className={`rounded-[6px] duration-300 ${
          error
            ? "border-[3px]  border-transparent hover:border-custom-error hover:border-opacity-[14%]"
            : "border-[3px] border-transparent focus-within:border-black focus-within:border-opacity-[6%]"
        } `}
      >
        <input
          type="text"
          className={`border duration-300 outline-none w-full ${
            error
              ? "border-custom-error"
              : "border-black border-opacity-[4%] hover:border-opacity-[14%]"
          } bg-black bg-opacity-[4%] py-[7px] px-[10px] rounded-[3px] placeholder:text-custom-base-200 placeholder:font-normal
          focus:border-custom-primary`}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
        />
      </div>

      {error && (
        <h6 className="text-custom-error mt-1 ml-[10px] text-sm">{error}</h6>
      )}
    </div>
  )
);

export default InputField;
