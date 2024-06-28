import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import InputText from "../components/InputText";
import { postLogin } from "../utils/api";
import AuthLayout from "../components/layout/AuthLayout";
import {
  email_validation,
  password_validation,
} from "../utils/inputValidation";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (e) => {
    setIsLoading(true);
    const payload = {
      email: e.email,
      password: e.password,
    };

    const response = await postLogin(payload);
    if (response.error) {
      setError("password", { type: "apiResponse", message: response.message });
      toast.error(response.message, { autoClose: 2500 });
    } else {
      toast.success("Success login", { autoClose: 2500 });
      localStorage.setItem("token", response.data.accessToken);
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center py-10 dark:bg-dark-bg-primary">
        <h2 className="font-semibold text-xl mb-5 dark:text-slate-300">
          Login to your account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="w-3/4 flex flex-col gap-2"
        >
          <InputText
            errors={errors.email}
            register={register}
            {...email_validation}
          />

          <InputText
            errors={errors.password}
            register={register}
            {...password_validation}
          />
          <button
            type="submit"
            className="mt-4 py-1 bg-gray-700 rounded-sm w-full text-white hover:bg-gray-800 transition-all"
            disabled={isLoading}
          >
            {!isLoading ? "Log in" : "Loading..."}
          </button>
        </form>

        <div className="mt-3">
          <h2 className="text-sm text-neutral-600 dark:text-slate-200">
            Don&apos;t have an account?{" "}
            <Link to={"/sign-up"} className="font-bold">
              Register
            </Link>
          </h2>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
