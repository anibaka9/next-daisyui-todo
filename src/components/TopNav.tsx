import Image from "next/image";
import Link from "next/link";
import LogoutLink from "./LogoutLink";

export default function TopNav() {
  return (
    <div className="navbar bg-base-00">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Todo
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="user pic"
                width={40}
                height={40}
                src="/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <LogoutLink>Logout</LogoutLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
