import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "../../../shared/lib/utils";
import { signUpSchema, type SignUpPayload } from "../schemas/signUp.schema";
import { useRegistration } from "../hooks/useRegistration";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { APP_ROUTES } from "../../../app/routes";
import { getApiErrorMessage } from "../../../shared/api/errors";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  })

  const { mutate: registerUser } = useRegistration()
  
  const onSubmit = (formData: SignUpPayload) => {
    registerUser(formData, {
      onSuccess: (response) => {
        toast.success(
          response.message || "Account created successfully!"
        );
  
        navigate(APP_ROUTES.LOGIN);
      },
  
      onError: (error) => {
        toast.error(
          getApiErrorMessage(error, "Registration failed. Please try again.")
        )
      },
    })
  }

  const inputClass = cn(
    "w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm",
    "text-slate-900 outline-none transition focus:border-indigo-500", 
    "focus:ring-2 focus:ring-indigo-500/10"
  );

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>
          <input
            id="firstName"
            autoComplete="given-name"
            placeholder="John"
            className={inputClass}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <input
            id="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            className={inputClass}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          className={inputClass}
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          className={inputClass}
          {...register("passwordConfirmation")}
        />
        {errors.passwordConfirmation && (
          <p className="mt-1 text-xs text-red-500">
            {errors.passwordConfirmation.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm",
          "font-medium text-white transition hover:bg-indigo-700",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  )
}

export default SignUpForm;