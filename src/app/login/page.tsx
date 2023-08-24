"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("🚀 ~ file: page.tsx:16 ~ .then ~ user:", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(
          "🚀 ~ file: page.tsx:19 ~ loginUser ~ errorCode:",
          errorCode
        );
        const errorMessage = error.message;
        console.log(
          "🚀 ~ file: page.tsx:21 ~ loginUser ~ errorMessage:",
          errorMessage
        );
      });
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
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
