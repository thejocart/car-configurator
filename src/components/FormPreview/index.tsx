import { FC, useMemo } from "react";
import Section from "../Section";
import { Service } from "../../types/Service";
import { calculateDiscount } from "../../utils/calculatePrice";
import { ContactFormData } from "../../types/ContactFormData";

const FormPreview: FC<{
  manufacturer: string | undefined;
  services: Service[];
  discount?: number | undefined;
  total: string;
  data: ContactFormData;
  onBack: () => void;
  handleSubmit: () => void;
}> = ({
  manufacturer,
  services,
  discount,
  total,
  data,
  onBack,
  handleSubmit,
}) => {
  const discountValue = useMemo(
    () => calculateDiscount(services, discount),
    [services, discount]
  );

  return (
    <>
      <Section title="Pregled i potvrda vašeg odabira">
        <p className={"text-custom-base-200"}>
          Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko
          želite promijeniti neki od podataka, vratite se na prethodni korak.
          Kada ste provjerili ispravnost svojih podataka, za slanje upita na
          servis pritisnite gumb “Pošalji”.
        </p>
      </Section>
      <div
        className={
          "bg-custom-background-200  mt-[20px] pt-1 px-[20px] pb-[20px] rounded-[10px]"
        }
      >
        <Section title="Model vozila">
          <h5>{manufacturer}</h5>
        </Section>
        <Section title="Odabrane usluge">
          {services.map((service) => (
            <div
              key={service?.id}
              className={
                "flex justify-between text-custom-black border-b border-b-black border-opacity-[14%] p-[5px]"
              }
            >
              <h5>{service?.name}</h5>
              <h5>{service?.price.toFixed(2).replace(".", ",")} €</h5>
            </div>
          ))}
          {discount ? (
            <div
              className={
                "flex justify-end items-center gap-[10px] text-custom-black mt-[5px] pr-[5px]"
              }
            >
              <h5>Popust {discount}%:</h5>
              <h5 className={"min-w-[70px] text-end"}>-{discountValue} €</h5>
            </div>
          ) : null}
          <div
            className={
              "flex justify-end items-center gap-[10px] text-custom-black mt-[5px] pr-[5px]"
            }
          >
            <h5>Ukupno:</h5>
            <h5 className={"min-w-[70px] text-end text-custom-primary"}>
              {total} €
            </h5>
          </div>
        </Section>
        <Section title="Kontakt podaci">
          <div className={"flex gap-[5px]"}>
            <h5 className={"text-custom-base-200 w-[120px]"}>Ime i prezime:</h5>
            <h5 className={"text-custom-black"}>{data?.fullName}</h5>
          </div>
          <div className={"flex gap-[5px] mt-[5px]"}>
            <h5 className={"text-custom-base-200 w-[120px]"}>Email adresa:</h5>
            <h5 className={"text-custom-black"}>{data?.email}</h5>
          </div>
          <div className={"flex gap-[5px] mt-[5px]"}>
            <h5 className={"text-custom-base-200 w-[120px]"}>Broj telefona:</h5>
            <h5 className={"text-custom-black"}>{data?.phoneNumber}</h5>
          </div>
          {data?.note ? (
            <div className={"flex gap-[5px] mt-[5px]"}>
              <h5 className={"text-custom-base-200 w-[120px]"}>Napomena:</h5>
              <h5 className={"text-custom-black"}>{data?.note}</h5>
            </div>
          ) : null}
        </Section>
      </div>
      <div className={"flex gap-[20px]"}>
        <button
          type="button"
          onClick={onBack}
          className={
            " py-[5px] px-[20px]  text-custom-black border border-custom-black text-[18px] mt-[20px] rounded-[3px] duration-200 hover:bg-opacity-[4%] hover:bg-black"
          }
        >
          Nazad
        </button>
        <button
          type="button"
          className={
            "flex-1 w-full py-[5px] px-[20px] bg-custom-primary text-white text-[18px] mt-[20px] rounded-[3px] duration-300 hover:bg-custom-primary-200"
          }
          onClick={handleSubmit}
        >
          Pošalji
        </button>
      </div>
    </>
  );
};

export default FormPreview;
