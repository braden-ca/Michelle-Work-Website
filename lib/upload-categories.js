const currentYear = new Date().getFullYear();
const years = [currentYear - 2, currentYear - 1, currentYear];

export const uploadSections = [
  {
    section: "Required Documents",
    categories: [
      { id: "signed-loan-application", label: "Signed Loan Application", maxFiles: 10 },
      { id: "borrower-authorization", label: "Borrower Authorization Form", maxFiles: 10 },
      { id: "drivers-license", label: "Copy of Driver's License", maxFiles: 3 },
    ],
  },
  {
    section: "Salaried Applicants",
    categories: [
      ...years.map((y) => ({ id: `w2-${y}`, label: `${y} W-2's`, maxFiles: 10 })),
      { id: "paystubs", label: "Complete Paystubs", maxFiles: 10 },
      ...years
        .slice()
        .reverse()
        .map((y) => ({
          id: `tax-return-salaried-${y}`,
          label: `${y} Signed Federal Tax Returns`,
          note: "Include all schedules & pages",
          maxFiles: 10,
        })),
    ],
  },
  {
    section: "Self-Employed Applicants",
    categories: years.map((y) => ({
      id: `tax-return-self-employed-${y}`,
      label: `${y} Signed Federal Tax Returns`,
      note: "Include all schedules & pages",
      maxFiles: 10,
    })),
  },
  {
    section: "Miscellaneous Documents",
    categories: years.map((y) => ({ id: `k1-${y}`, label: `${y} K-1 Documents`, maxFiles: 10 })),
  },
  {
    section: "Assets",
    categories: [
      {
        id: "checking-savings",
        label: "Checking / Savings",
        note: "Copies of bank statements for past 2 months, all pages",
        maxFiles: 10,
      },
      {
        id: "gifts-from-family",
        label: "Gifts From Family",
        note: "Gift letters from donor & verification of source (bank statements)",
        maxFiles: 10,
      },
      {
        id: "brokerage-money-market",
        label: "Stock Brokerage or Money Market Statements",
        note: "Statements from the past 2 months, all pages",
        maxFiles: 10,
      },
      {
        id: "retirement-accounts",
        label: "Retirement Accounts",
        note: "Past 2 months or 1 quarter, all pages",
        maxFiles: 10,
      },
    ],
  },
  {
    section: "Property Documentation",
    categories: [
      {
        id: "homeowners-insurance",
        label: "Homeowners Insurance Policy – Declarations Page",
        note: "Annual premium, for all properties owned",
        maxFiles: 10,
      },
      {
        id: "note-for-2nd",
        label: "Copy of Note for 2nd",
        note: "If subordinating current 2nd trust deed",
        maxFiles: 10,
      },
      {
        id: "hoa-contact-info",
        label: "HOA Contact Information",
        note: "In order to obtain certificate, insurance & budget",
        maxFiles: 10,
      },
      {
        id: "mortgage-statements",
        label: "Mortgage Statements",
        note: "Copies of current mortgage statements for all properties owned",
        maxFiles: 10,
      },
      {
        id: "trust-documents",
        label: "Copy of Trust and/or Trust Certificate",
        note: "Copies of all trust documents and trust certificates",
        maxFiles: 10,
      },
      {
        id: "lease-agreements",
        label: "Lease Agreements",
        note: "Copies of lease agreements for all rental properties owned",
        maxFiles: 10,
      },
    ],
  },
];

export const allUploadCategories = uploadSections.flatMap((s) => s.categories);

export const transactionTypes = [
  "Purchase",
  "Refinance",
  "Cash-Out Refinance",
  "HELOC / Second Mortgage",
];

export const propertyTypes = [
  "Single Family Residence",
  "Condominium",
  "Multi-Family (2-4 Units)",
  "Townhome",
  "Investment Property",
  "Other",
];

export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];
