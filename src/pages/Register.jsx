import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import InputText from "../components/InputText";
import AuthLayout from "../components/layout/AuthLayout";
import {
  email_validation,
  name_validation,
  password_validation,
} from "../utils/inputValidation";
import { postRegister } from "../utils/api";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (e) => {
    setIsLoading(true);
    const payload = {
      name: e.name,
      email: e.email,
      password: e.password,
    };

    const response = await postRegister(payload);
    if (response.error) {
      setError("password", { type: "apiResponse", message: response.message });
      toast.error(response.message, { autoClose: 2500 });
    } else {
      toast.success("Success create user, please login to continue", {
        autoClose: 2500,
      });
      navigate("/login");
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center w-3/4 py-10 mx-auto">
        <h2 className="font-semibold text-lg">Sign Up</h2>
        <p className="text-center text-slate-600 font-medium text-xs my-2">
          Sign up and discover a great amount of connection
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="flex flex-col gap-2 w-full"
        >
          <InputText
            errors={errors.name}
            register={register}
            {...name_validation}
          />
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
            {!isLoading ? "Sign up" : "Loading..."}
          </button>
        </form>

        <div className="mt-3">
          <h2 className="text-sm text-neutral-600">
            Have an account?{" "}
            <Link to={"/login"} className="font-bold">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
