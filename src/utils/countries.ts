export interface Country {
  displayName: string;
  code: string;
}

// TODO: add more countries

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
    displayName: "Germany",
    code: "de",
  },
];

// TODO: add unit tests

function getDisplayNameFromCountryCode(countryCode: string) {
  return (
    countries.find((country) => country.code === countryCode)?.displayName ?? ""
  );
}

export { countries, getDisplayNameFromCountryCode };
