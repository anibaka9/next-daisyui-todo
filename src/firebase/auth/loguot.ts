import { auth } from "../config";

export default async function logOut() {
  await auth.signOut();
}
