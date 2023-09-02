"use client";

import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="text-center text-3xl mb-3">Todo list</h1>
      <TodoList />
    </div>
  );
}
