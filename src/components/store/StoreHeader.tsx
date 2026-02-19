export default function StoreHeader({
  name,
  tagline,
  logoUrl,
}: {
  name: string;
  tagline?: string | null;
  logoUrl?: string | null;
}) {
  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        {logoUrl ? (
          <img
            src={logoUrl}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
            {name?.charAt(0)}
          </div>
        )}

        <div>
          <h1 className="font-bold text-lg leading-tight">{name}</h1>
          {tagline && (
            <p className="text-xs text-gray-500">{tagline}</p>
          )}
        </div>
      </div>
    </div>
  );
}
