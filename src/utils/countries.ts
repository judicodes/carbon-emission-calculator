export interface Country {
  displayName: string;
  code: string;
}

const countries: Country[] = [
  {
    displayName: "USA",
    code: "us",
  },
  {
    displayName: "Canada",
    code: "ca",
  },
  {
    displayName: "Austria",
    code: "at",
  },
  {
    displayName: "Belgium",
    code: "be",
  },
  {
    displayName: "Germany",
    code: "de",
  },
  {
    displayName: "Croatia",
    code: "hr",
  },
  {
    displayName: "Estonia",
    code: "ee",
  },
  {
    displayName: "France",
    code: "fr",
  },
  {
    displayName: "Italy",
    code: "it",
  },
  {
    displayName: "Portugal",
    code: "pt",
  },
];

function getDisplayNameFromCountryCode(countryCode: string) {
  return (
    countries.find((country) => country.code === countryCode)?.displayName ?? ""
  );
}

export { countries, getDisplayNameFromCountryCode };
