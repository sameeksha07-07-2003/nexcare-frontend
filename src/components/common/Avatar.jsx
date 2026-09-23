// src/components/common/Avatar.jsx
import defaultMale from "../../assets/images/avatar-male-default.svg";
import defaultFemale from "../../assets/images/avatar-female-default.svg";

const SIZES = {
  sm: "w-9 h-9 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-20 h-20 text-2xl",
  xl: "w-[82px] h-[82px] text-3xl",
};

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({
  photoUrl,
  gender,       // "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY" | undefined
  name,
  size = "md",
  rounded = "rounded-full",
  className = "",
}) {
  const sizeClasses = SIZES[size] || SIZES.md;

  // 1. Uploaded photo always wins
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name ? `${name}'s profile photo` : "Profile photo"}
        className={`${sizeClasses} ${rounded} object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  // 2. Gender-based default illustration
  if (gender === "MALE") {
    return (
      <img
        src={defaultMale}
        alt="Default profile avatar"
        className={`${sizeClasses} ${rounded} object-cover flex-shrink-0 bg-teal-50 ${className}`}
      />
    );
  }
  if (gender === "FEMALE") {
    return (
      <img
        src={defaultFemale}
        alt="Default profile avatar"
        className={`${sizeClasses} ${rounded} object-cover flex-shrink-0 bg-teal-50 ${className}`}
      />
    );
  }

  // 3. Fallback — initials on a gradient chip (used for doctors, or unspecified gender)
  return (
    <div
      className={`${sizeClasses} ${rounded} flex-shrink-0 flex items-center justify-center font-bold font-heading text-white bg-gradient-to-br from-teal-400 to-teal-700 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}