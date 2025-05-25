function SuspenseContent() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-gray-300 dark:text-gray-200 ">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
}

export default SuspenseContent;
