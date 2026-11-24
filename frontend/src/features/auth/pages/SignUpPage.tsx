
import { Link } from "react-router";
import SignUpForm from "../components/SignUpForm";

export const SignUpPage = () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Create an account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter your details to get started.
        </p>
      </div>

      <SignUpForm />

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
