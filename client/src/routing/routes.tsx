import { Route, Routes } from "react-router";
import { pages } from "./paths.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      {pages.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
};
