
const CardShimmer = () => {
  return (
    <div className=" border h-[400px] rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Header shimmer */}
      <div className="p-4 flex justify-between border-b">
        <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>

      {/* Body shimmer */}
      <div className="p-4 flex flex-col gap-4 flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-36 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Footer shimmer */}
      <div className="p-4 bg-gray-50 border-t mt-auto">
        <div className="flex justify-between">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CardShimmer;