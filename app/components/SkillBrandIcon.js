import {
  getPaymentBrandIcon,
  getPaymentBrandLocalLogo
} from "../lib/paymentBrandIcons";

export default function SkillBrandIcon({ name, className = "" }) {
  const icon = getPaymentBrandIcon(name);
  const localLogo = getPaymentBrandLocalLogo(name);

  if (icon) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
    );
  }

  if (localLogo) {
    return (
      <img
        src={localLogo}
        alt=""
        className={className}
        loading="lazy"
      />
    );
  }

  return null;
}
