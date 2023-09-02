export default function LoadingPage() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
}
