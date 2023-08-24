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
        <input
          type="checkbox"
          className="checkbox mr-4"
          onChange={(event) => {
            setIsDone(event.target.checked);
          }}
        />
        {isEditing ? (
          <form
            className="flex w-full"
            onSubmit={(action) => {
              action.preventDefault();
              saveTodo(editText);
              setIsEditing(false);
            }}
          >
            <input
              className="input flex-1 input-bordered mr-4"
              defaultValue={text}
            />
            <button className="btn">Save</button>
          </form>
        ) : (
          <>
            <p
              className="flex-1"
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
              <form
                method="dialog"
                className="modal-box"
                onSubmit={() => deleteTodo()}
              >
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
