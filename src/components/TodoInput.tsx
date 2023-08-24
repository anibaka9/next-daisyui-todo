"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import { db } from "@/firebase";

export default function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const saveTodo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: inputValue,
        idDone: false,
      });
    } catch (e) {}
    setInputValue("");
  };
  return (
    <form
      className="flex gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        saveTodo();
      }}
    >
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue}
        className="w-full input input-bordered"
        placeholder="Whats needs to be done?"
        type="text"
      />
      <button type="submit" className="btn">
        Create Todo
      </button>
    </form>
  );
}
