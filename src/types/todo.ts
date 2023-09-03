import { FieldValue } from "firebase/firestore";

export type newTodoType = {
  text: string;
  isDone: boolean;
  timestamp: FieldValue;
};

export type TodoType = newTodoType & {
  id: string;
};
