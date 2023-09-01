"use client";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { TodoItem } from "./TodoItem";
import { TodoType } from "@/types/todo";
import TodoInput from "./TodoInput";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TodoType[];
      setTodos(newData);
      console.log(newData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addTodo = async (inputValue: string) => {
    try {
      await addDoc(collection(db, "todos"), {
        text: inputValue,
        isDone: false,
      });
      await fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const setIsDone = async (id: string, isDone: boolean) => {
    const todoRef = doc(db, "todos", id);
    try {
      await updateDoc(todoRef, { isDone });
      await fetchPost();
      return !isDone;
    } catch (err) {
      console.log(err);
      return isDone;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      await fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  const saveTodo = async (id: string, text: string) => {
    console.log("🚀 ~ file: TodoList.tsx:72 ~ saveTodo ~ text:", text);
    const todoRef = doc(db, "todos", id);
    try {
      await updateDoc(todoRef, { text });
      await fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <TodoInput addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          isDone={todo.isDone}
          saveTodo={async (text) => {
            await saveTodo(todo.id, text);
          }}
          deleteTodo={async () => {
            await deleteTodo(todo.id);
          }}
          setIsDone={(value) => {
            return setIsDone(todo.id, value);
          }}
        />
      ))}
    </div>
  );
}
