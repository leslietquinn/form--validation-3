
import * as Yup from "yup";

const formSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username length should be at least 3 characters")
        .max(24, "Username cannot exceed more than 24 characters")
        .matches(/^[a-zA-Z0-9_ ]+$/, "Enter characters a-z, A-Z, 0-9 and SPACE only"),
    email: Yup.string()
        .required("Email is required")
        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Enter a valid, properly format email address"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password length should be at least 6 characters")
        .max(32, "Password cannot exceed more than 32 characters")
        .matches(/^[a-zA-Z0-9_@#]+$/, "Enter characters a-z, A-Z, 0-9 and _@# only"),
    confirm_password: Yup.string()
        .required("Password has to be confirmed")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    accept: Yup.boolean()
        .required("You must accept the terms")
        .oneOf([true], "You must accept the terms"),
});

export default formSchema;