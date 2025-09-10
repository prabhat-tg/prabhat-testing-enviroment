const HandleError = ({ title, isNoData, description }) => {
  return (
    <div className="mt-1 flex items-center justify-center px-4 py-10 lg:mt-40">
      <div className="bg-red-50 border-red-200 shadow-md w-full max-w-xl rounded-2xl border p-6 text-center">
        {" "}
        <div className="mb-3 text-4xl">⚠️</div>
        <h2 className="text-red-700 text-xl font-semibold">{title}</h2>
        {isNoData && <p className="text-red-600 mt-2 text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default HandleError;
