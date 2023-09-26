"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import signUp from "@/firebase/auth/signup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUpUser = async () => {
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log(error);
    } else {
      console.log(result);
      return router.push("/");
    }
  };
  return (
    <div className="max-w-xs mx-auto">
      <h1 className="text-center text-3xl mb-3 pt-8">Sign up</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signUpUser();
        }}
      >
        <div className="form-control">
          <label className="label">Email</label>
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
          <label className="label">Password</label>
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
          Sign up
        </button>
      </form>
      <div className="flex">
        <span className="w-full text-center mx-auto">
          Already a user?
          <Link href="/login" className="mt-3 ml-1 underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
