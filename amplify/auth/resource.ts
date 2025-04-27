import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  // Define custom attributes for users
  userAttributes: {
    // Required attributes
    email: {
      required: true,
      mutable: true,
    },
    // Custom attributes for role-based access control
    role: {
      required: false,
      mutable: true,
      type: "String",
    },
  },
  // Configure access for admin users
  multifactor: {
    optional: false, // We want MFA for admin users
  },
});
