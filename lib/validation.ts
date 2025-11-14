/**
 * Validates Indian mobile number
 * @param mobile - Mobile number string (should be 10 digits)
 * @returns Object with isValid boolean and error message
 */
export function validateIndianMobile(mobile: string): { isValid: boolean; error?: string } {
  // Remove any whitespace
  const cleaned = mobile.trim()

  // Check if empty
  if (!cleaned) {
    return { isValid: false, error: "Mobile number is required" }
  }

  // Check if contains only digits
  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, error: "Mobile number should contain only digits" }
  }

  // Check if exactly 10 digits
  if (cleaned.length !== 10) {
    return { isValid: false, error: "Mobile number must be exactly 10 digits" }
  }

  // Check if starts with valid Indian mobile prefix (6, 7, 8, or 9)
  const firstDigit = cleaned[0]
  if (!["6", "7", "8", "9"].includes(firstDigit)) {
    return {
      isValid: false,
      error: "Mobile number must start with 6, 7, 8, or 9",
    }
  }

  return { isValid: true }
}

