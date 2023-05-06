import {
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACTS_ROUTE,
    HOME_ROUTE,
    ORDERS_ROUTE,
    MAKE_ORDER_ROUTE,
    POLICY_ROUTE,
    PRODUCT_ROUTE,
    APARTMENT_ROUTE,
    PROFILE_ROUTE,
    SERVICE_ROUTE
} from "./utils/consts";
import Page from "./components/Page";
import Home from "./pages/Home";
import Product from "./pages/Catalog/Products/Product";
import Service from "./pages/Catalog/Services/Service";
import Profile from "./pages/Account/Profile";
import Cart from "./pages/Cart/Cart";
import MakeOrder from "./pages/Orders/MakeOrder";
import Orders from "./pages/Orders/Orders";
import Contacts from "./pages/Information/Contacts";
import Policy from "./pages/Information/Policy";
import Catalog from "./pages/Catalog/Catalog";
import Apartment from "./pages/Catalog/Booking/Apartment";


export const routes = [
    {
        path: HOME_ROUTE,
        Component: <Page showTopPanel={true} element={<Home/>}/>,
    },
    {
        path: CATALOG_ROUTE,
        Component: <Page showTopPanel={true} element={<Catalog/>}/>,
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: <Page showTopPanel={false} element={<Product/>}/>,
        showTopPanel: false,
        showBottomPanel:false,
    },
    {
        path: APARTMENT_ROUTE + '/:id',
        Component: <Page showTopPanel={false} element={<Apartment/>}/>,
        showTopPanel: false,
        showBottomPanel:false,
    },
    {
        path: SERVICE_ROUTE + '/:id',
        Component: <Page showTopPanel={false} element={<Service/>}/>,
    },
    {
        path: PROFILE_ROUTE,
        Component: <Page showTopPanel={false} element={<Profile/>}/>,
    },
    {
        path: CART_ROUTE,
        Component: <Page showTopPanel={false} element={<Cart/>}/>,
    },
    {
        path: MAKE_ORDER_ROUTE,
        Component: <Page showTopPanel={false}  element={<MakeOrder/>}/>,
    },
    {
        path: ORDERS_ROUTE,
        Component: <Page showTopPanel={false}  element={<Orders/>}/>,
    },
    {
        path: CONTACTS_ROUTE,
        Component: <Page showTopPanel={false}  element={<Contacts/>}/>,
    },
    {
        path: POLICY_ROUTE,
        Component: <Page showTopPanel={false}  element={<Policy/>}/>,
    },

];