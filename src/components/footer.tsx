import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <div className="py-3 text-center text-default-400 dark:text-gray-500">
      <Link
        isExternal
        className="text-inherit text-sm hover:opacity-75 px-1"
        href="https://www.kaggle.com/datasets/martinellis/nhl-game-data"
      >
        <i className="text-sm bi bi-link px-1" />
        {"data source"}
      </Link>
      <Link
        isExternal
        className="text-inherit text-sm hover:opacity-75 px-1"
        href="https://github.com/dreaesposito/comp-3380-frontend"
      >
        <i className="text-sm bi bi-github px-1" />
        {"github"}
      </Link>
    </div>
  );
}
