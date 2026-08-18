import { siApplepay, siMastercard, siPaypal, siStripe } from "simple-icons";

/** @typedef {import("simple-icons").SimpleIcon} SimpleIcon */

/** @type {Record<string, SimpleIcon>} */
const paymentBrandIcons = {
  Stripe: siStripe,
  PayPal: siPaypal,
  MPGS: siMastercard,
  "Apple Pay": siApplepay
};

/** Official logos saved from brand websites */
export const paymentBrandLocalLogos = {
  "Checkout.com": "/assets/logos/payments/checkout.svg",
  Tap: "/assets/logos/payments/tap.svg",
  Tabby: "/assets/logos/payments/tabby.svg",
  Payfort: "/assets/logos/payments/payfort.svg",
  Affirm: "/assets/logos/payments/affirm.svg"
};

/** @param {string} name @returns {SimpleIcon | null} */
export function getPaymentBrandIcon(name) {
  return paymentBrandIcons[name] || null;
}

/** @param {string} name @returns {string | null} */
export function getPaymentBrandLocalLogo(name) {
  if (paymentBrandIcons[name]) return null;
  return paymentBrandLocalLogos[name] || null;
}

/** @param {string} name @returns {boolean} */
export function hasPaymentBrandLogo(name) {
  return Boolean(getPaymentBrandIcon(name) || getPaymentBrandLocalLogo(name));
}
