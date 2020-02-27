export const signupVerificationSchema = (validator) => ({
  username: {
    required: true,
    validations: [
      {
        check: validator.isString
      }
    ]
  },
  password: {
    required: true,
    validations: [
      {
        check: validator.isString
      }
    ]
  }
});
