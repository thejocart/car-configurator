export interface ContactFormData {
  manufacturerId: string;
  serviceIds: string[];
  promoCode?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  note?: string;
}
