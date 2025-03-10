import { Link } from "@heroui/link";

export default function Footer() {
  return (
    <div className="p-2 text-center text-default-400 dark:text-gray-400 text-md">
      <Link
        isExternal
        className="text-inherit hover:opacity-75 px-1"
        href="https://www.kaggle.com/datasets/martinellis/nhl-game-data"
      >
        <i className="text-md bi bi-link px-1" />
        {"data source"}
      </Link>
      <Link
        isExternal
        className="text-inherit hover:opacity-75 px-1"
        href="https://github.com/dreaesposito/comp-3380-frontend"
      >
        <i className="text-md bi bi-github px-1" />
        {"github"}
      </Link>
    </div>
  );
}
