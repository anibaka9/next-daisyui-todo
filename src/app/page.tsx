import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="text-center text-3xl mb-3">Todo list</h1>
      <input
        className="w-full input input-bordered"
        placeholder="Whats needs to be done?"
        type="text"
      />
      {[0, 1, 2, 3, 4, 5].map((el) => (
        <div key={el} className="card shadow mt-5">
          <div className="flex gap-4 items-center p-4">
            <input type="checkbox" className="checkbox" />
            <p className="flex-1">Card</p>
            <PencilIcon className="h-4 w-4" />
            <TrashIcon className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
