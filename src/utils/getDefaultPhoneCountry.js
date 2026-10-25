import { getCountries } from "libphonenumber-js";

export const getDefaultPhoneCountry = () => {
  const countries = getCountries();
  const language = typeof navigator === "undefined" ? "" : navigator.language;
  let region = "";

  try {
    region = language ? new Intl.Locale(language).region || "" : "";
  } catch {
    region = "";
  }

  if (countries.includes(region)) return region;
  return countries.includes("NG") ? "NG" : "US";
};
