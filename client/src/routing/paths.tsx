import { HomePage } from "../pages/home/home.tsx";
import { SignInPage } from "../pages/sign-in/sign-in.tsx";
import { SignUpPage } from "../pages/sign-up/sign-up.tsx";

export const paths = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
};

export const pages = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.signIn, element: <SignInPage /> },
  { path: paths.signUp, element: <SignUpPage /> },
] as const;
