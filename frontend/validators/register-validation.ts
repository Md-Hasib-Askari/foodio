import * as Yup from "yup";
import { LoginFormDataType, loginValidationSchema } from "./login-validation";

export interface RegisterFormDataType extends LoginFormDataType {
    fullName: string;
    address: string;
}

export const registerValidationSchema = loginValidationSchema.shape({
    fullName: Yup.string()
        .min(2, "Full name is required")
        .required("Full name is required"),

    address: Yup.string()
        .min(5, "Address is required")
        .required("Address is required"),
});
