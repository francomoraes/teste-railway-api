import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Layout from '../Pages/Layout';
import Login from '../Pages/Login';
import useUserStore from '../store/useUserStore';

const RoutesComponent = () => {
    const { user } = useUserStore();

    return (
        <HashRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Layout />}
                >
                    {user && user?.name ? (
                        <>
                            <Route
                                path='/'
                                element={<Home />}
                            />
                            <Route
                                path='/products'
                                element={<Products />}
                            />
                        </>
                    ) : (
                        <Route
                            path='/'
                            element={<Login />}
                        />
                    )}
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RoutesComponent;
