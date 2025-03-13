import * as Yup from "yup";

export const userSchemaValidations = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores and not spaces")
    .required("Username is required"),
  
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be at most 20 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character")
    .required("Password is required"),
});


export const validContentType:string[]=["youtube","twitter","other"]

export const addContentValidations= Yup.object().shape({
  title: Yup.string()
   .required("Title is required"),
  description: Yup.string()
   .required("Description is required"),
  content: Yup.string()
   .required("Content is required"),
  type: Yup.string()
  .required("Type is required")
  .oneOf(validContentType),
});