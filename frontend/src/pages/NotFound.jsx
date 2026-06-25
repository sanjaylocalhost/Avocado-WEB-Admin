import { Link } from "react-router-dom";
import AvocadoMark from "../components/AvocadoMark";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-24 text-center">
      <AvocadoMark size={56} className="mx-auto mb-4 opacity-60" />
      <h1 className="font-display text-3xl text-ink">Page not found</h1>
      <p className="text-ink/60 mt-3">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="inline-block mt-6 text-skin font-medium hover:underline">
        Back to home
      </Link>
    </div>
  );
}
