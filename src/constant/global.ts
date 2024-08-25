export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const monthsOptions = months.map((month) => ({
    label: month,
    value: month,
}));

const currentYear = new Date().getFullYear();
export const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: `${currentYear + i}`,
    label: `${currentYear + i}`,
}));

export const genders = ["Male", "Female", "Other"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = genders.map((item) => ({
    value: item.toLowerCase(),
    label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
    value: item,
    label: item,
}));
