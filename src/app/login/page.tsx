"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import signIn from "@/firebase/auth/signin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginUser = async () => {
    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="max-w-xs mx-auto">
      <h1 className="text-center text-3xl mb-3 pt-8">Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginUser();
        }}
      >
        <div className="form-control">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="input input-bordered"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="input input-bordered"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="mt-5 btn btn-primary w-full">
          Login
        </button>
      </form>
      <div className="flex">
        <span className="w-full text-center mx-auto">
          Not a user?
          <Link href="/singup" className="mt-3 ml-1 underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}
