const z = require('zod');
const signInValidation = z.object({
    email: z.string().email({
      message: "Please enter valid email.",
    }),
    password: z.string().refine(
      (password) => {
        return (
          password.length >= 8 &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
        );
      },
      {
        message:
          "Password must be at least 8 characters and include lowercase, uppercase, digit, and special character.",
      }
    ),
  });
 const passwordValidation = z.object({
    password: z.string().refine(
      (password) => {
        return (
          password.length >= 8 &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
        );
      },
      {
        message:
          "Password must be at least 8 characters and include lowercase, uppercase, digit, and special character.",
      }
    ),
  });   
  const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

  module.exports ={ 
    signInValidation,
    passwordValidation,
    updateBody
  }