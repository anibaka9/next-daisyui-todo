"use client";
import { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

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
      <h1 className="text-center text-3xl mb-3">Sign up</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signUpUser();
        }}
        className="space-y-4"
      >
        <div className="form-control">
          <label className="label">Email</label>
          <input
            className="input input-bordered"
            type="username"
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
}
