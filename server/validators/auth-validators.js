const { z } = require("zod");

//creating an object schema
const registerSchema = z.object({
  email: z
    .string({ require_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast 3 character" })
    .max(255, { message: "Email must not be greater than 255 characters" }),
  username: z
    .string({ require_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 character" })
    .max(24, { message: "Username must not be greater than 24 characters" }),

  phone: z
    .string({ require_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 character" })
    .max(20, { message: "Phone must not be greater than 20 characters" }),
  password: z
    .string({ require_error: "Password is required" })
    .trim()
    // .regex(
    //   RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$",),
    //   "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number"
    // )
    // .min(8, { message: "Password should have atleast 8 characters" })

    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value ?? ""
        ),
      "Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one special character, and one number"
    )

});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email" })
    .min(3, { message: "Email should have atleast 3 character" })
    .max(64, { message: "Email cannot be more than 64 character" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 character" })
    .max(1024, {
      message: "Password must not be greater than 1024 characters",
    }),
});

module.exports = { registerSchema, loginSchema };
