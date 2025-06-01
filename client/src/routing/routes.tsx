import {Route, Routes} from "react-router";
import {pages} from "./paths.tsx";
import {PrivateRoute} from "./private-routes.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {pages.public.map(({path, element}) => (
                <Route path={path} element={element} key={path}/>
            ))}
            {pages.private.map(({path, element}) => (
                <Route path={path} element={<PrivateRoute>{element}</PrivateRoute>} key={path}/>
            ))}
        </Routes>
    );
};
