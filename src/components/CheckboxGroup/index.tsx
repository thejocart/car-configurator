import { FC, memo } from "react";
import { Service } from "../../types/Service";

interface ServiceCheckboxGroupProps {
  services: Service[];
  selectedServices: Service[];
  handleServiceChange: (service: Service) => void;
  error?: string | null;
  clearError?: () => void;
}

const CheckboxGroup: FC<ServiceCheckboxGroupProps> = ({
  services,
  selectedServices,
  handleServiceChange,
  error = false,
  clearError,
}) => {
  const handleClick = (service: Service) => {
    handleServiceChange(service);
    if (clearError) clearError();
  };

  return (
    <div className={"grid grid-cols-2 gap-[10px] mt-[20px] px-[10px]"}>
      {services.map((service) => (
        <label
          key={service.id}
          className={`text-[16px] flex items-center gap-[20px] ${
            error ? "text-red-500" : "text-custom-black"
          }`}
          onClick={() => handleClick(service)}
        >
          <div
            className={`border-[3px] rounded-md border-transparent hover:border-black hover:border-opacity-[8%]  duration-300 ${
              error && "hover:border-custom-error hover:border-opacity-30"
            }`}
          >
            <span
              className={`w-[16px] h-[16px] rounded-sm border flex items-center justify-center cursor-pointer
                ${
                  selectedServices.some(
                    (selected) => selected.id === service.id
                  )
                    ? "bg-custom-primary border-custom-primary"
                    : `bg-custom-background-200 ${
                        error ? "border-custom-error" : "border-custom-base-300"
                      }`
                }`}
            >
              {selectedServices.some(
                (selected) => selected.id === service.id
              ) && (
                <img
                  src={"src/assets/images/checkmark-small-icon.svg"}
                  alt="Checkmark"
                />
              )}
            </span>
          </div>
          <div className={"flex gap-1"}>
            {service.name}
            <span className={"text-custom-primary"}>({service.price}€)</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default memo(CheckboxGroup);
