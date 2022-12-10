function Loading() {
  return (
    <div className="flex justify-center items-center absolute inset-0 bg-black/50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-base-100"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-primary border-t-transparent shadow-md"></div>
      </div>
    </div>
  );
}

export default Loading;
