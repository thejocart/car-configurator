import { useState, useCallback, useEffect, ChangeEvent, useMemo } from "react";
import InputField from "../InputField";
import Section from "../Section";
import {
  fetchManufacturers,
  fetchServices,
  submitForm,
  validatePromoCode,
} from "../../services/api";
import { Manufacturer } from "../../types/Manufacturer";
import RadioButtonGroup from "../RadioButtonGroup";
import { Service } from "../../types/Service";
import { ContactFormData } from "../../types/ContactFormData";
import { PromoCodeValidation } from "../../types/PromoCodeValidation";
import FormPreview from "../FormPreview";
import { calculatePrice } from "../../utils/calculatePrice";
import { FormState } from "../../types/FormState";
import CheckboxGroup from "../CheckboxGroup";

const ServiceConfigurator = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const [formState, setFormState] = useState<FormState>(FormState.FORM);

  const [showInputCode, setShowInputCode] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [validationResult, setValidationResult] =
    useState<PromoCodeValidation | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    manufacturerId: "",
    serviceIds: [],
    promoCode: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    note: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    promoCode: null,
    manufacturerId: null,
    serviceIds: null,
    name: null,
    email: null,
    phone: null,
  });

  useEffect(() => {
    fetchManufacturers()
      .then((data: Manufacturer[]) => setManufacturers(data))
      .catch((error) => console.error("Error fetching manufacturers:", error));
  }, []);

  useEffect(() => {
    fetchServices()
      .then((data: Service[]) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleManufacturerChange = useCallback(
    (manufacturerId: string) => {
      const selected =
        manufacturers.find(
          (manufacturer) => manufacturer.id === manufacturerId
        ) || null;
      setSelectedManufacturer(selected);
    },
    [manufacturers, setSelectedManufacturer]
  );

  const handleServiceChange = useCallback(
    (service: Service) => {
      setSelectedServices((prevSelected) => {
        const isSelected = prevSelected.some((s) => s.id === service.id);
        return isSelected
          ? prevSelected.filter((s) => s.id !== service.id)
          : [...prevSelected, service];
      });
    },
    [setSelectedServices]
  );

  const totalPrice = useMemo(
    () =>
      calculatePrice(
        services,
        selectedServices,
        validationResult?.discountPercentage
      ),
    [services, selectedServices, validationResult?.discountPercentage]
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("nesto");
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const setFieldError = (fieldName: string, errorMessage: string | null) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };
  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string | null } = {};

    if (!selectedManufacturer?.id) {
      newErrors.manufacturerId = "Manufacturer is required.";
    }
    if (selectedServices.length === 0) {
      newErrors.serviceIds = "Please select at least one service.";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === null);
  };

  const handlePromoCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleValidatePromoCode = async () => {
    try {
      const result = await validatePromoCode(promoCode);
      setValidationResult(result);
      setErrors((prevErrors) => ({ ...prevErrors, promoCode: null }));
      setPromoCode("");
    } catch (error) {
      console.error("Error validating promo code:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        promoCode: "Invalid promo code.",
      }));
    }
  };

  const handleShowPreview = async () => {
    const isValid = validateFields();
    if (!isValid) {
      return;
    }
    setFormData({
      manufacturerId: selectedManufacturer?.id || "",
      serviceIds: selectedServices.map((service) => service.id),
      promoCode: validationResult?.code,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      note: formData.note,
    });
    setFormState(FormState.PREVIEW);
  };

  const handleSubmit = async () => {
    try {
      await submitForm(formData);
      setFormState(FormState.SUCCESS);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Failed to submit form. Please try again.",
      }));
    }
  };

  return (
    <div className={"flex flex-1 justify-center my-[50px]"}>
      <form onSubmit={handleSubmit} className={"max-w-[600px]"}>
        {formState != FormState.SUCCESS && (
          <h2 className={"font-bold"}>Konfigurator Servisa</h2>
        )}
        {formState === FormState.FORM && (
          <>
            <Section title="Odaberite proizvođača vašeg vozila">
              <RadioButtonGroup
                options={manufacturers}
                selectedOption={selectedManufacturer?.id || ""}
                onChange={handleManufacturerChange}
                error={errors?.manufacturerId}
                clearError={() => setFieldError("manufacturerId", null)}
              />
            </Section>

            <Section title="Odaberite jednu ili više usluga koju trebate">
              <CheckboxGroup
                services={services}
                selectedServices={selectedServices}
                handleServiceChange={handleServiceChange}
                error={errors?.serviceIds}
                clearError={() => setFieldError("serviceIds", null)}
              />
              <div
                className={
                  "flex justify-between items-center bg-custom-background-200 px-[15px] py-[10px] mt-[25px]"
                }
              >
                <h4 className={"text-custom-base-200"}>
                  ukupno:{" "}
                  <span className={"text-custom-primary font-bold"}>
                    {totalPrice}€
                  </span>
                </h4>
                <div>
                  {showInputCode ? (
                    <>
                      <div className={"flex items-center gap-[10px]"}>
                        <input
                          type="text"
                          value={promoCode}
                          onChange={handlePromoCodeChange}
                          placeholder="Unesi kod"
                          className={
                            "border border-black border-opacity-[4%] bg-black bg-opacity-[4%] py-[4px] px-[10px] w-[155px] rounded-[3px] placeholder:text-custom-base-200 placeholder:font-normal"
                          }
                        />
                        <button
                          type="button"
                          onClick={handleValidatePromoCode}
                          className={
                            "bg-custom-primary p-[5px] rounded-[3px] hover:bg-opacity-90 duration-300"
                          }
                        >
                          <img
                            src="src/assets/images/checkmark-icon.svg"
                            className={"w-[24px] h-[24px]"}
                          />
                        </button>
                      </div>

                      {validationResult ? (
                        <div className={"flex mt-[10px]"}>
                          <div
                            className={
                              "flex gap-1 items-center py-[3px] px-[7px] rounded-full bg-custom-background border border-black border-opacity-[14%]"
                            }
                          >
                            <h6>{validationResult?.code}</h6>
                            <button
                              onClick={() => setValidationResult(null)}
                              className={
                                "hover:bg-opacity-5 hover:bg-black duration-300 rounded-full "
                              }
                            >
                              <img
                                src="src/assets/images/ecs-icon.svg"
                                className={"w-[20px] h-[20px]"}
                              />
                            </button>
                          </div>
                        </div>
                      ) : null}
                      {errors?.promoCode && (
                        <p className="text-custom-error mt-1 text-sm">
                          {errors.promoCode}
                        </p>
                      )}
                    </>
                  ) : null}
                  {!showInputCode ? (
                    <button
                      type="button"
                      onClick={() => setShowInputCode(true)}
                      className={"text-custom-primary"}
                    >
                      Imam kupon
                    </button>
                  ) : null}
                </div>
              </div>
            </Section>

            <Section title="Vaši podaci">
              <div className={"flex gap-[20px]"}>
                <InputField
                  label="Ime i prezime"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Unesite ime i prezime"
                  onChange={handleInputChange}
                  error={errors?.fullName}
                  onFocus={() => setFieldError("name", null)}
                />
                <InputField
                  label="Broj telefona"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="Unesite broj telefona"
                  onChange={handleInputChange}
                  error={errors?.phoneNumber}
                  onFocus={() => setFieldError("phone", null)}
                />
              </div>
              <InputField
                label="Email adresa"
                name="email"
                value={formData.email}
                placeholder="Unesite email adresu"
                onChange={handleInputChange}
                error={errors?.email}
                onFocus={() => setFieldError("email", null)}
              />

              <div className={"flex flex-col mb-[20px] flex-1"}>
                <label className={"text-[14px] text-custom-black ml-[10px]"}>
                  Napomena (opcionalno)
                </label>
                <textarea
                  className={
                    "border border-black border-opacity-[4%] bg-black bg-opacity-[4%] py-[7px] px-[10px] rounded-[3px] placeholder:text-custom-base-200 placeholder:font-normal"
                  }
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Unesite napomenu"
                  rows={3}
                />
              </div>
            </Section>

            <button
              type="button"
              className={
                "w-full py-[5px] px-[20px] bg-custom-primary text-white text-[18px] mt-[20px] rounded-[3px] duration-300 hover:bg-custom-primary-200"
              }
              onClick={() => handleShowPreview()}
            >
              Dalje
            </button>
          </>
        )}
        {formState === FormState.PREVIEW && (
          <FormPreview
            manufacturer={selectedManufacturer?.name}
            services={selectedServices}
            discount={validationResult?.discountPercentage}
            total={totalPrice}
            data={formData}
            onBack={() => setFormState(FormState.FORM)}
            handleSubmit={() => handleSubmit()}
          />
        )}
      </form>
      {formState === FormState.SUCCESS && (
        <div className={"flex-1 flex justify-center"}>
          <div
            className={
              "flex flex-col items-center justify-center gap-[20px] w-[540px]"
            }
          >
            <img src="src/assets/images/success-icon.svg" />
            <h2 className={"text-custom-primary font-bold"}>
              Vaša prijava je uspješno poslana
            </h2>
            <h4 className={"text-custom-black text-center"}>
              Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo
              vas u najkraćem mogućem roku. Hvala vam!
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceConfigurator;
