import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>❌ Ой! Щось пішло не так...</h1>
      <p>{error.data || error.message}</p>
      <a href="/">🔙 Повернутись на головну</a>
    </div>
  );
}

export default Error;
