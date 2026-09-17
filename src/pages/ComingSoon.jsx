import { useNavigate } from "react-router-dom";
import { IoConstructOutline } from "react-icons/io5";
import { PageLayout, EmptyState } from "../components/shared";

const ComingSoon = ({ title, userRole = "admin", backTo = "/admin" }) => {
  const navigate = useNavigate();

  return (
    <PageLayout title={title} userRole={userRole}>
      <EmptyState
        customIcon={<IoConstructOutline size={64} className="mx-auto text-blue-500" />}
        title={`${title} — Coming Soon`}
        description="This feature is on the roadmap and isn't available yet."
        action={
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        }
      />
    </PageLayout>
  );
};

export default ComingSoon;
