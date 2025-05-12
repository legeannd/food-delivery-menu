export default function Loading() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col animate-pulse space-y-8 ">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-50 rounded bg-gray-200"></div>
        </div>
        <div className="flex flex-col space-y-4 py-6 px-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-10 h-4 rounded bg-gray-200"></div>
                <div className="col-span-2 h-4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-10 h-4 rounded bg-gray-200"></div>
                <div className="col-span-2 h-4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-10 h-4 rounded bg-gray-200"></div>
                <div className="col-span-2 h-4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
