"use client";

import { useState } from "react";

type TodoInputProps = {
  addTodo: (inputText: string) => void;
};

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="flex gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        addTodo(inputValue);
        setInputValue("");
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
        required
      />
      <button type="submit" className="btn">
        Create Todo
      </button>
    </form>
  );
}
