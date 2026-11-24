
import { Link } from "react-router";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to your account to continue.
        </p>
      </div>

      <LoginForm />

      <p className="mt-7 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};
