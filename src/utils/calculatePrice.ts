import { Service } from "../types/Service";

export const calculatePrice = (
  services: Service[],
  selectedServices: Service[],
  discount?: number
): string => {
  const total = services
    .filter((service) =>
      selectedServices.some((selected) => selected.id === service.id)
    )
    .reduce((sum, service) => sum + service.price, 0);

  const discountAmount = discount ? total * (discount / 100) : 0;
  const finalTotal = total - discountAmount;

  return finalTotal.toFixed(2).replace(".", ",");
};

export const calculateDiscount = (
  selectedServices: Service[],
  discount?: number
): string => {
  const total = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const discount1 = discount ? total * (discount / 100) : 0;
  return discount1.toFixed(2).replace(".", ",");
};
