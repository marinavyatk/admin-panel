import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { paths } from "../../routing/paths.tsx";
import { FormPageLayout } from "../../components/formPageLayout/layout.tsx";
import { api } from "../../api/api.ts";

type SignInFormData = {
  email: string;
  password: string;
};

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    try {
      setServerError(null);
      await api.signIn(data.email, data.password);
      toast.success("Welcome!");
      navigate(paths.home);
    } catch (e) {
      if (e instanceof Error) {
        setServerError(e.message);
      } else {
        setServerError("Unknown error occurred");
      }
    }
  };

  const footer = (
    <>
      Don’t have an account?
      <Link to={paths.signUp} className="btn btn-link">
        Sign up
      </Link>
    </>
  );

  return (
    <div>
      <FormPageLayout footer={footer}>
        <>
          <span className="opacity-75">Start your journey</span>
          <h1 className="mb-5">
            Sign in
            <br /> to the App
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="name@example.com"
                {...register("email", { required: "Email is required" })}
              />
              <label htmlFor="floatingInput">Email address</label>
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id='rememberMe'/>
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </>
      </FormPageLayout>
    </div>
  );
};
