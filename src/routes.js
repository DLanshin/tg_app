import {
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACTS_ROUTE,
    HOME_ROUTE,
    ORDERS_ROUTE,
    MAKE_ORDER_ROUTE,
    POLICY_ROUTE,
    PRODUCT_ROUTE,
    PROFILE_ROUTE
} from "./utils/consts";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import MakeOrder from "./pages/MakeOrder";
import Page from "./components/Page";
import Contacts from "./pages/Contacts";
import Policy from "./pages/Policy";
import Product from "./pages/Product";
import Orders from "./pages/Orders";


export const routes = [
    {
        path: HOME_ROUTE,
        Component: <Page showTopPanel={true} element={<Catalog/>}/>,
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