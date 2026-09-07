import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedPublicRoutes from './ProtectedPublicRoutes'
import AdminProtectedRoutes from './AdminProtectedRoutes'
import Home from '../pages/Home'
import Dashboard from '../pages/Admin/Dashboard'
import Categories from '../pages/Admin/Categories'
import SubCategories from '../pages/Admin/SubCategories'
import AdminLogin from '../pages/Admin/AdminLogin'
import EditCategory from "../pages/Admin/EditCategory"
import AddCategory from '../pages/Admin/AddCategory'
import AddSubCategory from '../pages/Admin/AddSubCateory'
import EditSubCategory from '../pages/Admin/EditSubCategory'
import AddProduct from '../pages/Admin/AddProduct'
import Products from '../pages/Admin/Products'
import EditProduct from '../pages/Admin/EditProduct'
import EditProductStock from '../pages/Admin/EditProductStock'
import ProductListing from "../pages/ProductListing"
import ProductDetails from '../pages/ProductDetails'
import Login from "../pages/Login"
import Register from '../pages/Register'
import Cart from '../pages/Cart'
import Address from '../pages/Address'
import Checkout from '../pages/Checkout'
import Payment from '../pages/Payment'
import OrderConfirmation from '../pages/OrderConfirmation'
import Profile from '../pages/Profile'
import PersonalInfo from '../components/Profile/PersonalInfo'
import ChangePassword from '../components/Profile/ChangePassword'
import AddressSection from '../components/Profile/AddressSection'
import OrderSection from '../components/Profile/OrderSection'
import OrderDetails from '../pages/OrderDetails'
import PaymentGuard from '../components/Common/PaymentGuard'
import CheckoutGuard from '../components/Common/CheckoutGuard'



// Admin component pages
import AdminLayout from '../components/AdminComponent/Layout/AdminLayout'
import CategoriesPage from '../AdminPages/CategoriesPage'
import AddCategoryPage from '../AdminPages/AddCategoryPage'
import SubCategoriesPage from '../AdminPages/SubCategoriesPage'
import AddSubCategoryPage from '../AdminPages/AddSubCategoryPage'
import ProductsPage from '../AdminPages/ProductsPage'
import AddProductPage from '../AdminPages/AddProductPage'
import CouponsPage from '../AdminPages/CouponsPage'
import AddCouponPage from '../AdminPages/AddCouponPage'
import OrdersPage from '../AdminPages/OrdersPage'
import OrderDetailsPage from '../AdminPages/OrderDetailsPage'
import InventoryPage from '../AdminPages/InventoryPage'
import InventoryDetailsPage from '../AdminPages/InventoryDetailsPage'
import UsersPage from '../AdminPages/UsersPage'
import UserDetailsPage from '../AdminPages/UserDetailsPage'
import DashboardPage from '../AdminPages/DashboardPage'
import EditCategoryPage from '../AdminPages/EditCategoryPage'
import EditSubCategoryPage from '../AdminPages/EditSubCategoryPage'
import EditProductStockPage from '../AdminPages/EditProductStockPage'
import EditProductPage from "../AdminPages/EditProductPage"
import EditCouponPage from "../AdminPages/EditCouponPage"
import AdminLoginPage from '../AdminPages/AdminLoginPage'   


function AppRoutes() {
    return (
        <>
            <Routes>
                {/* public routes */}
                <Route path='/' element={<MainLayout />}>
                    <Route path="" element={<Home />}/>
                      {/* Product routes */}
                    <Route path="/products" element={<ProductListing />}/>
                    <Route path="/products/:type" element={<ProductListing />}/>
                    <Route path="/product/:id" element={<ProductDetails />}/>
                    <Route path="/search" element={<ProductListing />}/>

                    {/* public protected routes */}
                    <Route element={<ProtectedPublicRoutes />}>
                        <Route path="/cart" element={<Cart />}/>
                        <Route path="/address/create" element={<Address />}/>
                        <Route path="/address/edit/:id" element={<Address />}/>
                        <Route 
                            path="/checkout/address" 
                            element={
                                <CheckoutGuard>
                                    <Checkout />
                                </CheckoutGuard>
                            }
                        />
                        <Route path="/order-confirmation" element={<OrderConfirmation />}/>
                        <Route path="/profile" element={<Profile />}>
                            <Route index element={<PersonalInfo />} />
                            <Route path="password" element={<ChangePassword />} />
                            <Route path="addresses" element={<AddressSection />} />
                            <Route path="orders" element={<OrderSection />} />
                        </Route>
                        <Route path="/order-details/:id" element={<OrderDetails />}/>
                    </Route>
                </Route>


                <Route element={<ProtectedPublicRoutes />}>
                    <Route 
                        path="/checkout/payment" 
                        element={
                            <PaymentGuard>
                                <Payment />
                            </PaymentGuard>
                        }
                    />
                </Route>
                

                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>

                {/* admin public routes */}
                <Route path="/admin/login" element={<AdminLoginPage />}/>
                


                {/* protected admin routes */}
                {false && (<Route element={<AdminProtectedRoutes />}>
                    {/* dashboard */}
                    <Route path="/admin/dashboard" element={<Dashboard />}/>
                    
                    {/* categories */}
                    <Route path="/admin/categories" element={<Categories />}/>
                    <Route path="/admin/category/new" element={<AddCategory />}/>
                    <Route path="/admin/category/edit/:id" element={<EditCategory />}/>

                    {/* sub-categories */}
                    <Route path="/admin/sub-categories" element={<SubCategories />}/>
                    <Route path="/admin/sub-category/new" element={<AddSubCategory />}/>
                    <Route path="/admin/sub-category/edit/:id" element={<EditSubCategory />}/>

                    {/* products */}
                    <Route path="/admin/product/new" element={<AddProduct />}/>
                    <Route path="/admin/products" element={<Products />}/>
                    <Route path="/admin/product/edit/:id" element={<EditProduct />}/>
                    <Route path="/admin/product/stock/:id" element={<EditProductStock />}/>

                </Route>)}

                {/* Protected admin routes */}
                <Route element={<AdminProtectedRoutes />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path='categories' element={<CategoriesPage />} />
                        <Route path='categories/new' element={<AddCategoryPage />} />
                        <Route path='categories/:id/edit' element={<EditCategoryPage />} />
                        <Route path='sub-categories' element={<SubCategoriesPage />} />
                        <Route path='sub-categories/new' element={<AddSubCategoryPage />} />
                        <Route path='sub-categories/:id/edit' element={<EditSubCategoryPage />} />
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='products/new' element={<AddProductPage />} />
                        <Route path='products/:id/edit' element={<EditProductPage />} />
                        <Route path='products/:id/stock' element={<EditProductStockPage />} />
                        <Route path='coupons' element={<CouponsPage />} />
                        <Route path='coupons/new' element={<AddCouponPage />} />
                        <Route path='coupons/:id/edit' element={<EditCouponPage />} />
                        <Route path='orders' element={<OrdersPage />} />
                        <Route path='orders/:id/details' element={<OrderDetailsPage />} />
                        <Route path='inventory' element={<InventoryPage />} />
                        {/* <Route path='inventory/:id' element={<InventoryDetailsPage />} /> */}
                        <Route path='products/inventory/:id' element={<InventoryDetailsPage />} />
                        <Route path='users' element={<UsersPage />} />
                        <Route path='users/:userId' element={<UserDetailsPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes