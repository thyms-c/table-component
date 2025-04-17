"use client";

export const mockTableData = Array.from({ length: 50 }, (_, i) => {
  const baseDate = new Date(2025, 1, 1 + i); // Feb 2025

  const types = ["I", "O", "M"];
  const countries = [
    "CHINA: CBU-Import",
    "THAILAND: Local Production",
    "GERMANY: Export",
    "USA: Domestic",
    "JAPAN: CBU-Import",
    "Hello Balerion",
  ];

  const randomType = types[i % types.length];
  const randomCountry = countries[i % countries.length];
  const code = `LC0DE4CD6R${i.toString().padStart(2, "0")}`;

  return {
    id: (i + 1).toString(),
    header1: `Seal Lion ${i + 1}`,
    header2: code,
    date: baseDate.toISOString(),
    header3: `${randomCountry}\n${randomCountry}`,
    type: randomType,
    number: (Math.floor(Math.random() * 5) + 1) * 1000 + i * 10,
  };
});
