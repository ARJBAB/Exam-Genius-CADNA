const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

const TimelineFeed = ({ entries = [] }) => {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedEntries.map((entry) => (
        <article
          key={entry.id}
          className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
        >
          {entry.images?.length > 0 && (
            <div
              className={`grid gap-0.5 ${
                entry.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {entry.images.slice(0, 4).map((imageSrc, index) => (
                <img
                  key={index}
                  src={imageSrc}
                  alt=""
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <div className="p-4">
            <p className="text-gray-700 leading-relaxed mb-3">
              {entry.caption}
            </p>

            <div className="flex items-center">
              {entry.author?.avatarUrl ? (
                <img
                  src={entry.author.avatarUrl}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-xs">
                    {getInitials(entry.author?.name)}
                  </span>
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {entry.author?.name}
                </div>
                <time
                  dateTime={entry.createdAt}
                  className="text-xs text-gray-600"
                >
                  {formatTimestamp(entry.createdAt)}
                </time>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TimelineFeed;
