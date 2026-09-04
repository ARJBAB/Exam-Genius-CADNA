import { useTheme } from "../context/ThemeContext.jsx";

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

const CATEGORY_STYLES = {
  exams: "bg-blue-100 text-blue-700",
  scholarships: "bg-green-100 text-green-700",
  jobs: "bg-orange-100 text-orange-700",
  community: "bg-purple-100 text-purple-700",
};

const capitalize = (word = "") => word.charAt(0).toUpperCase() + word.slice(1);

const TimelineFeed = ({
  entries = [],
  currentUserId,
  onEdit,
  onDelete,
}) => {
  const { darkMode } = useTheme();
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedEntries.map((entry) => {
        const authorId = entry.author?.id;
        const isOwnPost = Boolean(
          currentUserId && authorId && authorId === currentUserId
        );

        return (
          <article
            key={entry.id || entry._id}
            className={`${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            } rounded-2xl overflow-hidden hover:shadow-lg transition-shadow`}
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
              <div className="flex items-start justify-between gap-2 mb-3">
                {entry.category && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      CATEGORY_STYLES[entry.category] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {capitalize(entry.category)}
                  </span>
                )}

                {isOwnPost && (
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => onEdit?.(entry)}
                      className={`text-xs font-medium ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete?.(entry)}
                      className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <p
                className={`leading-relaxed mb-3 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
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
                  <div
                    className={`text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {entry.author?.name}
                  </div>
                  <time
                    dateTime={entry.createdAt}
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {formatTimestamp(entry.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TimelineFeed;
