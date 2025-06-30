export default function UserProfilePageLoading() {
  return (
    <div className="min-h-screen bg-white py-8 px-4 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 bg-zinc-200 rounded-full" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-zinc-200 rounded w-1/3" />
            <div className="h-5 bg-zinc-200 rounded w-1/4" />
            <div className="flex flex-wrap gap-4">
              <div className="h-4 w-32 bg-zinc-200 rounded" />
              <div className="h-4 w-32 bg-zinc-200 rounded" />
            </div>
            <div className="h-4 bg-zinc-200 rounded w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="h-4 bg-zinc-200 rounded w-2/5" />
              <div className="h-8 bg-zinc-200 rounded w-1/2" />
              <div className="h-3 bg-zinc-200 rounded w-3/4" />
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <div className="h-5 bg-zinc-200 rounded w-1/3" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-6 bg-zinc-200 rounded px-4" />
            ))}
          </div>
          <div className="h-4 bg-zinc-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
}
