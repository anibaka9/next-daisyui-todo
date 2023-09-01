"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";
import Link from "next/link";

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
      <h1 className="text-center text-3xl mb-3">Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginUser();
        }}
        className="space-y-4"
      >
        <div className="form-control">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="input input-bordered"
            type="email"
            name="email"
            id="email"
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
            name="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link href="/singup" className="mt-3 text-center">
        Sign Up
      </Link>
    </div>
  );
}
