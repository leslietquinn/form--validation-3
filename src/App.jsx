import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import formSchema from "./Forms/Schema/RegisterForm";
import globalInstance from "./Utils/Axios/GlobalInstance";

const App = () => {
    const {register, handleSubmit, reset, setError, formState: { errors }} = useForm({
        // mode options are onBlur, onChange, or onSubmit
        mode: "onChange",
        resolver: yupResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            accept: false,
        },
    });

    const submitForm = (data) => {
        console.log(JSON.stringify(data, null, 4));

        postData(data);
        reset();

        return false;
    };

    async function postData(props) { 
        try {
            const response = await globalInstance.post("/authenticate/register", JSON.stringify({
                username: props.username,
                password: props.password,
                email: props.email,
            }),
            {
                headers: { 
                    "Content-Type": "application/json; charset=UTF-8",
                    "Accept": "application/json; charset=UTF-8",
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                    "Cache-Control": "no-cache" 
                },
                withCredentials: true
            });
                
            if(response.status == 201) {
                console.log(response);
            } 
        } catch(error) {
            // console.log(error.response.data?.errors);

            const keys = Object.keys(error.response.data?.errors);
            keys.forEach((key, index) => {
                setError(key, {
                    type: "server",
                    message: error.response.data?.errors[key],
                });
            });
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        &nbsp;
                    </div>
                    <div className="col-lg-4">

                        <br />
                        <br />
                        <br />
                        <hr />
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    autoFocus
                                    className="form-control form-control-lg my-2"
                                    type="text" 
                                    id="username" 
                                    autoComplete="off"
                                    placeholder="Enter a username" 
                                    {
                                        ...register("username")
                                    }
                                />
                                {errors.username?.message && (<p className="error">{errors.username.message}</p>)}

                                <label htmlFor="email">Email</label>
                                <input 
                                    className="form-control form-control-lg my-2" 
                                    type="text" 
                                    id="email" 
                                    autoComplete="off"
                                    placeholder="Enter an email address" 
                                    {
                                        ...register("email")
                                    }
                                />
                                {errors.email?.message && (<p className="error">{errors.email.message}</p>)}

                                <label htmlFor="password">Password</label>
                                <input 
                                    className="form-control form-control-lg my-2" 
                                    type="password" 
                                    id="password" 
                                    placeholder="Enter a password" 
                                    {
                                        ...register("password")
                                    }
                                />
                                {errors.password?.message && (<p className="error">{errors.password.message}</p>)}

                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input 
                                    className="form-control form-control-lg my-2" 
                                    type="password" 
                                    id="confirm_password" 
                                    placeholder="Enter password once again" 
                                    {
                                        ...register("confirm_password")
                                    }
                                />
                                {errors.confirm_password?.message && (<p className="error">{errors.confirm_password.message}</p>)}

                                <div className="form-check">
                                    <input 
                                        className="form-check-input my-2"
                                        type="checkbox" 
                                        id="accept" 
                                        {
                                            ...register("accept")
                                        }
                                    />
                                    <label className="form-check-label" htmlFor="accept">Accept Terms?</label>
                                </div>
                                {errors.accept?.message && (<p className="error">{errors.accept.message}</p>)}

                                <button className="btn btn-lg btn-dark w-100 mt-2">Register</button>
                                <button type="button" onClick={() => reset()} className="mt-2 btn btn-lg btn-secondary w-100">Reset</button>
                            </div>
                        </form>
                        <hr />

                    </div>
                    <div className="col-lg-4">
                        &nbsp;
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
