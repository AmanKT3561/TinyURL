import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { BeatLoader } from "react-spinners";
import Error from "./error"
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Login = () => {



    const [errors, setErrors] = useState({});

    const [formData, setformData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("creatNew");


    const { loading, error, fn: fnLogin, data } = useFetch(login, formData);

    useEffect(() => {
        if (error == null && data != null) {

            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, data]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
            });

            await schema.validate(formData, { abortEarly: false });
            await fnLogin();

        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };


    return (

        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your account if you already have one.</CardDescription>
                {error && <Error message={error?.message} />}
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full"
                        onChange={handleInputChange}
                    />
                    {errors.email && <Error message={errors.email} />}

                </div>

                <div className="space-y-2">
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full"
                        onChange={handleInputChange}
                    />
                    {errors.password && <Error message={errors.password} />}

                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={handleLogin} className="w-full">
                    {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}

                </Button>
            </CardFooter>
        </Card>

    )
}

export default Login