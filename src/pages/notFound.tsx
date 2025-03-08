import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate(); // function to return to previous page

  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-default-900">404</h1>
        <p className="mt-4 mx-2 text-2xl text-gray-600">Page Not Found</p>
        <p className="mt-2 px-2 text-lg text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-3 flex items-center justify-center gap-4">
          <Link
            className={buttonStyles({
              color: "default",
              variant: "shadow",
            })}
            href="/"
            onPress={() => navigate(-1)}
          >
            Previous page
          </Link>
          <Link
            className={buttonStyles({
              color: "default",
              variant: "shadow",
            })}
            href="/"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
