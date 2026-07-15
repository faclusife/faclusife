import Link from "next/link";

export default function MoviesHeader() {
  return (
    <div className="ml-10 mt-10 lg:ml-0">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        {"← Home"}
      </Link>
      <div className="mt-4 flex justify-center text-6xl font-bold">
        {"Сайт рейтінга фільмів від Миколи (Толстого) і Богдана"}
      </div>
    </div>
  );
}
