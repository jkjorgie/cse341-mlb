/**
 * Shared validation utilities for controllers
 */

/**
 * Checks if a value is a non-empty string
 * @param {*} value - The value to check
 * @returns {boolean} - True if value is a non-empty string
 */
const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Converts a value to a number, returning undefined if empty/null
 * @param {*} value - The value to convert
 * @returns {number|undefined} - The converted number, undefined if empty, or NaN if invalid
 */
const toNumber = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
};

/**
 * Converts a value to a boolean
 * @param {*} value - The value to convert
 * @returns {boolean|undefined|null} - The converted boolean, undefined if empty, or null if invalid
 */
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

/**
 * Trims a string value if it's a string, otherwise returns the original value
 * @param {*} value - The value to trim
 * @returns {*} - The trimmed string or original value
 */
const trimString = (value) =>
  typeof value === "string" ? value.trim() : value;

/**
 * Validates required string fields
 * @param {object} data - The data object to validate
 * @param {string[]} fields - Array of field names that are required strings
 * @param {string[]} errors - Array to push error messages to
 */
const validateRequiredStrings = (data, fields, errors) => {
  fields.forEach((key) => {
    if (!isNonEmptyString(data[key])) {
      errors.push(`${key} is required and must be a non-empty string`);
    }
  });
};

/**
 * Validates numeric fields (if provided, must be valid numbers)
 * @param {object} data - The data object to validate
 * @param {string[]} fields - Array of field names that should be numbers
 * @param {string[]} errors - Array to push error messages to
 */
const validateNumericFields = (data, fields, errors) => {
  fields.forEach((key) => {
    if (data[key] !== undefined && Number.isNaN(data[key])) {
      errors.push(`${key} must be a valid number`);
    }
  });
};

/**
 * Validates boolean fields (if provided, must be valid booleans)
 * @param {object} data - The data object to validate
 * @param {string[]} fields - Array of field names that should be booleans
 * @param {string[]} errors - Array to push error messages to
 */
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
