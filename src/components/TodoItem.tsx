"use client";

import { useState, useEffect, useRef } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

interface TodoItemProps {
  text: string;
  isDone: boolean;
  deleteTodo: () => void;
  saveTodo: (text: string) => void;
  setIsDone: (value: boolean) => void;
}

export function TodoItem({
  text,
  isDone,
  saveTodo,
  deleteTodo,
  setIsDone,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  useEffect(() => {
    setEditText(text);
  }, [text]);

  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="card shadow mt-5">
      <div className="flex items-center p-4">
        {isEditing ? (
          <form
            className="flex w-full gap-3"
            onSubmit={async (action) => {
              action.preventDefault();
              saveTodo(editText);
              setIsEditing(false);
            }}
          >
            <input
              size={1}
              className="input flex-1 input-bordered"
              defaultValue={text}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button type="submit" className="btn">
              Save
            </button>
            <button
              type="reset"
              className="btn btn-neutral"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <input
              type="checkbox"
              className="checkbox mr-4"
              onChange={(event) => setIsDone(event.target.checked)}
              checked={isDone}
            />
            <p
              className={`flex-1 ${isDone ? "line-through" : ""}`}
              onDoubleClick={() => {
                setIsEditing(true);
              }}
            >
              {text}
            </p>
            <button className="btn btn-circle btn-ghost">
              <PencilIcon
                className="h-4 w-4"
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            </button>
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => modalRef?.current?.showModal()}
            >
              <TrashIcon className="h-4 w-4" id="delete_todo_modal" />
            </button>
            <dialog ref={modalRef} className="modal">
              <form method="dialog" className="modal-box" onSubmit={deleteTodo}>
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Delete Todo?</p>
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Delete
                  </button>
                  <button
                    type="reset"
                    className="btn"
                    onClick={() => modalRef?.current?.close()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </dialog>
          </>
        )}
      </div>
    </div>
  );
}
