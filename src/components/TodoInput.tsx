"use client";

import { useState } from "react";

type TodoInputProps = {
  addTodo: (inputText: string) => Promise<void>;
};

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [inputValue, setInputValue] = useState("");

  const [addTodoIsLoading, setAddTodoIsLoading] = useState(false);

  return (
    <form
      className="flex gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setAddTodoIsLoading(true);
        await addTodo(inputValue);
        setInputValue("");
        setAddTodoIsLoading(false);
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
        {addTodoIsLoading && <span className="loading loading-spinner"></span>}
        Create Todo
      </button>
    </form>
  );
}
