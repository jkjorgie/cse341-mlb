const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const toNumber = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
};

const toBoolean = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    if (lower === "true") return true;
    if (lower === "false") return false;
  }
  return null;
};

const trimString = (value) =>
  typeof value === "string" ? value.trim() : value;

const validateRequiredStrings = (data, fields, errors) => {
  fields.forEach((key) => {
    if (!isNonEmptyString(data[key])) {
      errors.push(`${key} is required and must be a non-empty string`);
    }
  });
};

const validateNumericFields = (data, fields, errors) => {
  fields.forEach((key) => {
    if (data[key] !== undefined && Number.isNaN(data[key])) {
      errors.push(`${key} must be a valid number`);
    }
  });
};

const validateBooleanFields = (data, fields, errors) => {
  fields.forEach((key) => {
    if (data[key] === null) {
      errors.push(`${key} must be a boolean (true/false)`);
    }
  });
};

module.exports = {
  isNonEmptyString,
  toNumber,
  toBoolean,
  trimString,
  validateRequiredStrings,
  validateNumericFields,
  validateBooleanFields,
};
