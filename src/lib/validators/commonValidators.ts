import { z } from "zod";
// ================== COMMON VALIDATION HELPERS ==================

export class CommonValidation {
  /**
   * Required string with length constraints
   * @param min Minimum length
   * @param max Maximum length
   * @returns Zod string schema
   */
  static requiredString(min: number = 1, max: number = 255) {
    return z
      .string()
      .trim()
      .min(min, `Must be at least ${min} character${min !== 1 ? "s" : ""}`)
      .max(max, `Must not exceed ${max} characters`);
  }

  /**
   * Optional string with length constraints
   * @param min Minimum length (if provided)
   * @param max Maximum length
   * @returns Zod optional string schema
   */
  static optionalString(min: number = 0, max: number = 255) {
    return z
      .string()
      .trim()
      .min(
        min,
        min > 0
          ? `Must be at least ${min} character${min !== 1 ? "s" : ""}`
          : undefined
      )
      .max(max, `Must not exceed ${max} characters`)
      .optional()
      .or(z.literal(""));
  }

  /**
   * Email validation
   */
  static email() {
    return z
      .string()
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase();
  }

  /**
   * URL validation
   */
  static url() {
    return z.string().url("Please enter a valid URL").trim();
  }

  /**
   * Number with range constraints
   * @param min Minimum value
   * @param max Maximum value
   * @returns Zod number schema
   */
  static numberInRange(min: number, max: number) {
    return z
      .number()
      .min(min, `Must be at least ${min}`)
      .max(max, `Must not exceed ${max}`);
  }

  /**
   * Optional number with range constraints
   */
  static optionalNumberInRange(min: number, max: number) {
    return z
      .number()
      .min(min, `Must be at least ${min}`)
      .max(max, `Must not exceed ${max}`)
      .optional();
  }

  /**
   * Hex color validation
   */
  static hexColor() {
    return z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #FF0000)")
      .trim();
  }

  /**
   * Boolean with default value
   */
  static booleanWithDefault(defaultValue: boolean = false) {
    return z.boolean().default(defaultValue);
  }
}
