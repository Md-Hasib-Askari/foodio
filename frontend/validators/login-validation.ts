import * as Yup from "yup";

export interface LoginFormDataType {
    email: string;
    password: string;
}

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .required("Password is required"),
});
