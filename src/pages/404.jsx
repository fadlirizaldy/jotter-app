const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="/notfound.png" alt="Not Found" className="mb-4" />
      <h1 className="text-3xl text-slate-400 font-semibold">Page Not Found</h1>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
