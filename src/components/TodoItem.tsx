"use client";

import { useState, useEffect, useRef } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import useOptimisticToggle from "@/hooks/useOptimisticToggle";

interface TodoItemProps {
  text: string;
  isDone: boolean;
  deleteTodo: () => Promise<void>;
  saveTodo: (text: string) => Promise<void>;
  setIsDone: (value: boolean) => Promise<unknown>;
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

  const [toggle, setToggle] = useOptimisticToggle({
    initialValue: isDone,
    action: setIsDone,
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [editTextIsLoading, setEditTextIsLoading] = useState(false);

  return (
    <div className="card shadow mt-5">
      <div className="flex items-center p-4">
        <input
          type="checkbox"
          className="checkbox mr-4"
          onChange={setToggle}
          checked={toggle}
        />
        {isEditing ? (
          <form
            className="flex w-full"
            onSubmit={async (action) => {
              action.preventDefault();
              setEditTextIsLoading(true);
              await saveTodo(editText);
              setEditTextIsLoading(false);
              setIsEditing(false);
            }}
          >
            <input
              className="input flex-1 input-bordered mr-4"
              defaultValue={text}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button type="submit" disabled={editTextIsLoading} className="btn">
              {editTextIsLoading && (
                <span className="loading loading-spinner"></span>
              )}
              Save
            </button>
          </form>
        ) : (
          <>
            <p
              className={`flex-1 ${toggle ? "line-through" : ""}`}
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
                onSubmit={async () => {
                  setDeleteIsLoading(true);
                  await deleteTodo();
                  setDeleteIsLoading(false);
                }}
              >
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Delete Todo?</p>
                <div className="modal-action">
                  <button
                    disabled={deleteIsLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    {deleteIsLoading && (
                      <span className="loading loading-spinner"></span>
                    )}
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
