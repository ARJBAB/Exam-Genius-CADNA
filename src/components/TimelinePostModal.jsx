import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const MAX_IMAGES = 6;

const CATEGORY_OPTIONS = [
  { value: "exams", label: "Exams" },
  { value: "scholarships", label: "Scholarships" },
  { value: "jobs", label: "Jobs" },
  { value: "community", label: "Community" },
];

const TimelinePostModal = ({ mode = "create", initialData, onClose, onSubmit }) => {
  const { darkMode } = useTheme();
  const [caption, setCaption] = useState(initialData?.caption || "");
  const [category, setCategory] = useState(initialData?.category || CATEGORY_OPTIONS[0].value);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEdit = mode === "edit";

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images.`);
      setImages(files.slice(0, MAX_IMAGES));
      return;
    }
    setError("");
    setImages(files);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!caption.trim()) {
      setError("Caption is required.");
      return;
    }

    setSubmitting(true);
    setError("");
    const result = await onSubmit({ caption: caption.trim(), category, images });
    setSubmitting(false);

    if (!result?.success) {
      setError(result?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg shadow-xl max-w-lg w-full mx-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            darkMode ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {isEdit ? "Edit Post" : "Post to Timeline"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className={`w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
              placeholder="Share an update..."
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {!isEdit && (
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Images (up to {MAX_IMAGES})
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className={`w-full text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              />
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Posting..." : isEdit ? "Save Changes" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelinePostModal;
