import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="h-screen flex items-center justify-center bg-red-100 text-red-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Упс! Щось пішло не так.</h1>
        <p className="mb-4">{error.statusText || error.message}</p>
        <a href="/" className="text-blue-700 underline">
          На головну
        </a>
      </div>
    </div>
  );
}
