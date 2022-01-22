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

export { countries };
