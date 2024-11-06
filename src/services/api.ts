import { ContactFormData } from "../types/ContactFormData";
import { Manufacturer } from "../types/Manufacturer";
import { PromoCodeValidation } from "../types/PromoCodeValidation";
import { Service } from "../types/Service";

const API_URL = "https://fe-interview-project-backend.accounts-a35.workers.dev";
const token = "borealis-fe-interview-token";

export const fetchManufacturers = async (): Promise<Manufacturer[]> => {
  const response = await fetch(`${API_URL}/api/manufacturers`, {
    method: "GET",
    headers: {
      "x-authentication-token": token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_URL}/api/services`, {
    method: "GET",
    headers: {
      "x-authentication-token": token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const submitForm = async (data: ContactFormData): Promise<void> => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authentication-token": token,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit form: ${response.statusText}`);
  }

  console.log("Form submitted successfully");
};

export const validatePromoCode = async (
  code: string
): Promise<PromoCodeValidation> => {
  const response = await fetch(`${API_URL}/api/validate-promo-code/${code}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authentication-token": token,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to validate promo code: ${response.statusText}`);
  }

  const data: PromoCodeValidation = await response.json();
  return data;
};
