"use client";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { TodoItem } from "./TodoItem";
import { TodoType } from "@/types/todo";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TodoType[];
      setTodos(newData);
      console.log(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          isDone={todo.isDone}
          saveTodo={(text) => {
            console.log(text);
          }}
          deleteTodo={() => {
            console.log("delete");
          }}
          setIsDone={(value) => {
            console.log(value);
          }}
        />
      ))}
    </div>
  );
}
