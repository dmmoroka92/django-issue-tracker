import { useForm } from "react-hook-form"
import { loginSchema, type LoginPayload } from "../schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../../shared/lib/utils"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { APP_ROUTES } from "../../../app/routes"
import { getApiErrorMessage } from "../../../shared/api/errors"

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { mutate: loginUser } = useLogin()

  const inputClass = cn(
    "w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm",
    "text-slate-900 outline-none transition focus:border-indigo-500", 
    "focus:ring-2 focus:ring-indigo-500/10"
  )

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700"

  const onSubmit = (formData: LoginPayload) => {
    loginUser(formData, {
      onSuccess: (response) => {
        console.log("login response", response)

        toast.success(
          response.message || "Login successful!"
        )

        navigate(APP_ROUTES.DASHBOARD);
      },
      
      onError: (error) => {
        toast.error(
          getApiErrorMessage(
            error,
            "Login failed. Please try again."
        ))
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4">
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
        {
          errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )
        }
      </div>

      <div className="mb-4">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="********"
          className={inputClass}
          {...register("password")}
        />
        {
          errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )
        }
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
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

export default LoginForm;