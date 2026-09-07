import { Link, useLocation } from "react-router-dom";

const routeMap = {
    "/products": [
        { label: "Products", path: "/products" }
    ],

    "/products/featured": [
        { label: "Products", path: "/products" },
        { label: "Featured" }
    ],

    "/products/top-deals": [
        { label: "Products", path: "/products" },
        { label: "Top Deals" }
    ],

    "/products/new-arrivals": [
        { label: "Products", path: "/products" },
        { label: "New Arrivals" }
    ],

    "/cart": [
        { label: "Cart" }
    ],

    "/checkout/address": [
        { label: "Cart", path: "/cart" },
        { label: "Checkout" },
        { label: "Address" }
    ],

    "/checkout/payment": [
        { label: "Cart", path: "/cart" },
        { label: "Checkout" },
        { label: "Payment" }
    ],

    "/orders": [
        { label: "Orders" }
    ],

    "/profile": [
        { label: "Profile" }
    ],

    "/order-success": [
        { label: "Order Success" }
    ]
};


function formatLabel(label) {
    return label
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}


function Breadcrumb() {
    const location = useLocation();

    const pathname = location.pathname;

    let breadcrumbItems = routeMap[pathname];

    // Product details: /product/:id
    if (!breadcrumbItems && pathname.startsWith("/product/")) {
        const productId = pathname.split("/")[2];

        breadcrumbItems = [
            { label: "Products", path: "/products" },
            { label: productId }
        ];
    }

    // Order details: /orders/:id
    if (!breadcrumbItems && pathname.startsWith("/orders/")) {
        const orderId = pathname.split("/")[2];

        breadcrumbItems = [
            { label: "Orders", path: "/orders" },
            { label: orderId }
        ];
    }

    // Fallback
    if (!breadcrumbItems) {
        breadcrumbItems = [];
    }

    return (
        <nav 
            aria-label="Breadcrumb" 
            className="hidden md:flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-3">

            {/* Home */}
            <Link
                to="/"
                className="text-gray-500 hover:text-orange-500 transition"
            >
                Home
            </Link>

            {breadcrumbItems.map((item, index) => (
                <span
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-2"
                >
                    <span className="text-gray-400">
                        &gt;
                    </span>

                    {item.path ? (
                        <Link
                            to={item.path}
                            className="text-gray-500 hover:text-orange-500 transition"
                        >
                            {formatLabel(item.label)}
                        </Link>
                    ) : (
                        <span className="font-medium text-slate-900">
                            {formatLabel(item.label)}
                        </span>
                    )}
                </span>
            ))}

        </nav>
    );
}

export default Breadcrumb;