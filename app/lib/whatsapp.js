export const WHATSAPP_NUMBER = "923159144751";
export const WHATSAPP_DISPLAY = "+923159144751";

/** Phone link: https://wa.me/<number> (international format, no +) */
export function getWhatsAppShareUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_SHARE_URL = getWhatsAppShareUrl();
