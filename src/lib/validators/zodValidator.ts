// lib/validation.ts
import { z } from "zod";

/**
 * GENERALIZED ZOD VALIDATION LIBRARY
 *
 * This library provides common validation schemas and utilities
 * that can be reused across the application.
 *
 * Usage Examples:
 *
 * 1. Basic validation:
 *    const schema = z.object({ name: CommonValidation.requiredString(1, 100) });
 *
 * 2. Custom validation:
 *    const customSchema = z.string().refine(
 *      (val) => val.includes("@"),
 *      { message: "Must contain @ symbol" }
 *    );
 *
 * 3. Conditional validation:
 *    const conditionalSchema = z.object({
 *      type: z.string(),
 *      value: z.string()
 *    }).refine(
 *      (data) => data.type === "email" ? data.value.includes("@") : true,
 *      { message: "Invalid email format", path: ["value"] }
 *    );
 */

// ================== UTILITY FUNCTIONS ==================

/**
 * Validates data against a schema and returns formatted errors
 * @param schema Zod schema
 * @param data Data to validate
 * @returns Validation result with formatted errors
 */
export function validateWithSchema<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.errors.reduce((acc, error) => {
      const path = error.path.join(".");
      acc[path] = error.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      success: false as const,
      errors: formattedErrors,
      data: null,
    };
  }

  return {
    success: true as const,
    errors: {},
    data: result.data,
  };
}

/**
 * Creates a validation function for a specific schema
 * @param schema Zod schema
 * @returns Validation function
 */
export function createValidator<T>(schema: z.ZodSchema<T>) {
  return (data: unknown) => validateWithSchema(schema, data);
}

// ================== EXAMPLE USAGE ==================

/*
// Example 1: Basic form validation
const userSchema = z.object({
  name: CommonValidation.requiredString(2, 50),
  email: CommonValidation.email(),
  age: CommonValidation.optionalNumberInRange(13, 120),
});

// Example 2: Custom validation with refinement
const passwordSchema = z.object({
  password: CommonValidation.requiredString(8, 50),
  confirmPassword: CommonValidation.requiredString(8, 50),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords must match",
    path: ["confirmPassword"],
  }
);

// Example 3: Using the validator
const validateUser = createValidator(userSchema);
const result = validateUser({ name: "John", email: "john@example.com" });

if (!result.success) {
  console.log(result.errors); // { name: "Must be at least 2 characters" }
} else {
  console.log(result.data); // Typed user data
}
*/
