"use client";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { TodoItem } from "./TodoItem";
import { TodoType, newTodoType } from "@/types/todo";
import TodoInput from "./TodoInput";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const fetchPost = () => {
    try {
      const unsub = onSnapshot(collection(db, "todos"), (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as TodoType[];
        setTodos(newData);
        console.log(newData);
      });
      return unsub;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    const unsub = fetchPost();
    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, []);

  const addTodo = async (inputValue: string) => {
    const newTodo: newTodoType = {
      text: inputValue,
      isDone: false,
      timestamp: serverTimestamp(),
    };
    try {
      addDoc(collection(db, "todos"), newTodo);
    } catch (err) {
      console.log(err);
    }
  };

  const setIsDone = async (id: string, isDone: boolean) => {
    const todoRef = doc(db, "todos", id);
    try {
      await updateDoc(todoRef, { isDone });
      return !isDone;
    } catch (err) {
      console.log(err);
      return isDone;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (err) {
      console.log(err);
    }
  };

  const saveTodo = async (id: string, text: string) => {
    const todoRef = doc(db, "todos", id);
    try {
      updateDoc(todoRef, { text });
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
          saveTodo={(text) => {
            saveTodo(todo.id, text);
          }}
          deleteTodo={async () => {
            deleteTodo(todo.id);
          }}
          setIsDone={(value) => {
            setIsDone(todo.id, value);
          }}
        />
      ))}
    </div>
  );
}
