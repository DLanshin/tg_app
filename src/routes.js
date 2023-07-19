import * as CONFIG_ROUTES from "./utils/consts";
import Page from "./components/Page";
import Home from "./pages/Home";
import Profile from "./pages/Account/Profile";
import Cart from "./pages/Cart/Cart";
import MakeOrder from "./pages/Orders/MakeOrder";
import Orders from "./pages/Orders/Orders";
import Contacts from "./pages/Information/Contacts";
import Policy from "./pages/Information/Policy";
import Apartment from "./pages/Catalog/Booking/Apartment";
import ServicesPage from "./pages/Products/ServicesPage";
import SingleServicePage from "./pages/Products/SingleServicePage";


export const routes = [
    {
        path: CONFIG_ROUTES.HOME_ROUTE,
        Component: <Page showTopPanel={true} element={<Home/>}/>,
    },


    {
        path: CONFIG_ROUTES.PRODUCT_ROUTE,
        Component: <Page showTopPanel={false} element={<ServicesPage/>}/>,
        showTopPanel: false,
        showBottomPanel:false,
    },
    {
        path: CONFIG_ROUTES.PRODUCT_ROUTE + '/:id',
        Component: <Page showTopPanel={false} element={<SingleServicePage/>}/>,
        showTopPanel: false,
        showBottomPanel:false,
    },
    {
        path: CONFIG_ROUTES.APARTMENT_ROUTE + '/:id',
        Component: <Page showTopPanel={false} element={<Apartment/>}/>,
        showTopPanel: false,
        showBottomPanel:false,
    },
    {
        path: CONFIG_ROUTES.SERVICE_ROUTE,
        Component: <Page showTopPanel={false} element={<ServicesPage/>}/>,
    },
    {
        path: CONFIG_ROUTES.SERVICE_ROUTE + '/:id',
        Component: <Page showTopPanel={false} element={<SingleServicePage/>}/>,
    },
    {
        path: CONFIG_ROUTES.PROFILE_ROUTE,
        Component: <Page showTopPanel={false} element={<Profile/>}/>,
    },
    {
        path: CONFIG_ROUTES.CART_ROUTE,
        Component: <Page showTopPanel={false} element={<Cart/>}/>,
    },
    {
        path: CONFIG_ROUTES.MAKE_ORDER_ROUTE,
        Component: <Page showTopPanel={false}  element={<MakeOrder/>}/>,
    },
    {
        path: CONFIG_ROUTES.ORDERS_ROUTE,
        Component: <Page showTopPanel={false}  element={<Orders/>}/>,
    },
    {
        path: CONFIG_ROUTES.CONTACTS_ROUTE,
        Component: <Page showTopPanel={false}  element={<Contacts/>}/>,
    },
    {
        path: CONFIG_ROUTES.POLICY_ROUTE,
        Component: <Page showTopPanel={false}  element={<Policy/>}/>,
    },

];