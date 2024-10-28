import { HashRouter, Route, Routes } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { Home, Layout, Login, Products } from '../Pages';
import ProductDetail from '@/Pages/Products/Pages/ProductDetail/ProductDetail';
import AddProducts from '@/Pages/Products/Pages/AddProduct/AddProducts';

const RoutesComponent = () => {
    const { user } = useUserStore();

    return (
        <HashRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Layout />}
                >
                    {user ? (
                        <>
                            <Route
                                path='/'
                                element={<Home />}
                            />
                            <Route
                                path='/products'
                                element={<Products />}
                            />
                            <Route
                                path='/products/:productId'
                                element={<ProductDetail />}
                            />
                            <Route
                                path='/products/add-product'
                                element={<AddProducts />}
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
