
const { z } = require("zod");

function validateUser(data) {
  const schema = z.object({
    name: z
      .string()
      .min(3, "Student name must be at least 3 characters")
      .max(50, "Student name must be at most 50 characters"),

    emailId: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  });

  return schema.parse(data);
}

module.exports = validateUser;
