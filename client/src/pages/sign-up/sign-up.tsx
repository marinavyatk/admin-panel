import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { paths } from "../../routing/paths.tsx";
import { FormPageLayout } from "../../components/formPageLayout/layout.tsx";
import { api } from "../../api/api.ts";
import { toast } from "react-toastify";

export type RegisterFormData = {
  email: string;
  name: string;
  password: string;
};

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      await api.signUp(data);
      toast.success("You have successfully registered!");
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
      Already have an account?
      <Link to={paths.signIn} className="btn btn-link">
        Sign in
      </Link>
    </>
  );

  return (
    <div>
      <FormPageLayout footer={footer}>
        <>
          <span className="opacity-75">Start your journey</span>
          <h1 className="mb-5">
            Sign up
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email",
                  },
                })}
              />
              <label>Email address</label>
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Anna Ivanova"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <label>Name</label>
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <label>Password</label>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkDefault"
              />
              <label className="form-check-label" htmlFor="checkDefault">
                Remember me
              </label>
            </div>

            <button className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </>
      </FormPageLayout>
    </div>
  );
};
