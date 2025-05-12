export default function Loading() {
  return (
    <div className="flex flex-col self-center w-full md:w-3xl space-y-4 px-4 py-6">
      {Array.from(Array(10).keys()).map((key) => (
        <div key={key} className="flex animate-pulse space-x-4">
          <div className="size-18 rounded-lg bg-gray-200"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="space-y-1">
              <div className="grid grid-cols-8 gap-4">
                <div className="col-span-3 h-4 rounded bg-gray-200"></div>
                <div className="col-span-2 h-4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
