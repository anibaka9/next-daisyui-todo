"use client";
import { useEffect, useMemo, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import type { newTodoType, TodoType } from "@/types/todo";

import { auth, db } from "@/firebase/config";
import { TodoItem } from "./TodoItem";
import TodoInput from "./TodoInput";
import LoadingPage from "./LoadingPage";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TodoList() {
  const [user] = useAuthState(auth);

  const [userTodoListInfoData, userTodoListInfoLoading] = useCollection(
    user?.uid
      ? query(collection(db, "todoLists"), where("userId", "==", user?.uid))
      : undefined
  );

  const userTodoListId: string | undefined = useMemo(
    () => userTodoListInfoData?.docs[0]?.id,
    [userTodoListInfoData?.docs]
  );

  useEffect(() => {
    if (!userTodoListInfoLoading && !userTodoListId) {
      addDoc(collection(db, "todoLists"), {
        userId: user?.uid,
      });
    }
  }, [userTodoListInfoLoading, user?.uid, userTodoListId]);

  const [todoData, loading] = useCollection(
    userTodoListId
      ? collection(db, "todoLists", userTodoListId, "todos")
      : undefined
  );

  const todos: TodoType[] | undefined = useMemo(
    () =>
      todoData?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TodoType[] | undefined,
    [todoData?.docs]
  );

  const addTodo = async (inputValue: string) => {
    if (!userTodoListId) return;
    const newTodo: newTodoType = {
      text: inputValue,
      isDone: false,
      timestamp: serverTimestamp(),
    };
    try {
      addDoc(collection(db, "todoLists", userTodoListId, "todos"), newTodo);
    } catch (err) {
      console.log(err);
    }
  };

  const setIsDone = async (id: string, isDone: boolean) => {
    if (!userTodoListId) return;
    const todoRef = doc(db, "todoLists", userTodoListId, "todos", id);
    try {
      await updateDoc(todoRef, { isDone });
      return !isDone;
    } catch (err) {
      console.log(err);
      return isDone;
    }
  };

  const deleteTodo = async (id: string) => {
    if (!userTodoListId) return;
    try {
      await deleteDoc(doc(db, "todoLists", userTodoListId, "todos", id));
    } catch (err) {
      console.log(err);
    }
  };

  const saveTodo = async (id: string, text: string) => {
    if (!userTodoListId) return;
    const todoRef = doc(db, "todoLists", userTodoListId, "todos", id);
    try {
      updateDoc(todoRef, { text });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <TodoInput addTodo={addTodo} />
      {loading && <LoadingPage />}
      {todos &&
        todos.map((todo) => (
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
