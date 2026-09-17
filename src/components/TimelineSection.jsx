import { useContext, useEffect, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { AuthContext } from "../context/AuthContextDefinition.js";
import { Card, LoadingSpinner } from "./shared";
import TimelineFeed from "./TimelineFeed.jsx";
import TimelinePostModal from "./TimelinePostModal.jsx";
import timelineService from "../services/timelineService.js";

const TimelineSection = () => {
  const { darkMode } = useTheme();
  const { user } = useContext(AuthContext);
  const currentUserId = user?._id || user?.id;

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const loadTimeline = async () => {
      setLoading(true);
      const result = await timelineService.getTimeline();
      if (result.success) {
        setEntries(Array.isArray(result.data) ? result.data : []);
      } else {
        setError(result.error || "Failed to load timeline");
      }
      setLoading(false);
    };

    loadTimeline();
  }, []);

  const handleCreate = useCallback(async (values) => {
    const result = await timelineService.createPost(values);
    if (result.success && result.data) {
      setEntries((prev) => [result.data, ...prev]);
      setShowCreateModal(false);
    }
    return result;
  }, []);

  const handleUpdate = useCallback(
    async (values) => {
      const postId = editingEntry?.id || editingEntry?._id;
      const result = await timelineService.updatePost(postId, values);
      if (result.success) {
        setEntries((prev) =>
          prev.map((entry) =>
            (entry.id || entry._id) === postId
              ? { ...entry, caption: values.caption, category: values.category }
              : entry,
          ),
        );
        setEditingEntry(null);
      }
      return result;
    },
    [editingEntry],
  );

  const handleDelete = useCallback(async (entry) => {
    const postId = entry.id || entry._id;
    if (!window.confirm("Delete this post? This can't be undone.")) return;

    const result = await timelineService.deletePost(postId);
    if (result.success) {
      setEntries((prev) => prev.filter((e) => (e.id || e._id) !== postId));
    }
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Timeline
        </h2>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          Post to Timeline
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Card className="p-6 text-center">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{error}</p>
        </Card>
      ) : entries.length === 0 ? (
        <Card className="p-6 text-center">
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            No posts yet. Be the first to share an update.
          </p>
        </Card>
      ) : (
        <TimelineFeed
          entries={entries}
          currentUserId={currentUserId}
          onEdit={setEditingEntry}
          onDelete={handleDelete}
        />
      )}

      {showCreateModal && (
        <TimelinePostModal
          mode="create"
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreate}
        />
      )}

      {editingEntry && (
        <TimelinePostModal
          mode="edit"
          initialData={editingEntry}
          onClose={() => setEditingEntry(null)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default TimelineSection;
