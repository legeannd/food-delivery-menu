export default function Loading() {
  return (
    <div className="flex flex-grow flex-col animate-pulse space-y-4 py-6 px-4">
      <div className="flex space-x-4 w-full">
        <div className="size-12 rounded-lg bg-gray-200"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="space-y-1"></div>
        </div>
      </div>
      <div className="flex space-x-4 w-full">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="space-y-1">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-3 h-4 rounded bg-gray-200"></div>
              <div className="col-span-3 h-4 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
