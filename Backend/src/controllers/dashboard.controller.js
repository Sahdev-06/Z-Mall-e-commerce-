import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Order } from "../models/order.model.js"
import { User } from '../models/user.model.js';
import { Product } from "../models/product.model.js"


const getDashboardStats = asyncHandler(async (req, res) => {

    const result = await Order.aggregate([
        {
            $match : {
                orderStatus : "Delivered"
            }
        }, 

        {
            $group : {
                _id : null,
                totalRevenue : {
                    $sum : "$totalAmount"
                }
            }
        }
    ])

    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalProducts = await Product.countDocuments()

    const status = await Order.aggregate([
        {
            $group : {
                _id : null,
                pending : {
                    $sum : {
                        $cond : [
                            { $eq : ["$orderStatus", "Pending" ]},
                            1,
                            0
                        ]
                    }
                },
                confirmed : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$orderStatus", "Confirmed" ]},
                            1,
                            0
                        ]
                    }
                },
                processing : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$orderStatus", "Processing" ]},
                            1,
                            0
                        ]
                    }
                },
                shipped : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$orderStatus", "Shipped" ]},
                            1,
                            0
                        ]
                    }
                },
                delivered : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$orderStatus", "Delivered" ]},
                            1,
                            0
                        ]
                    }
                },
                cancelled : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$orderStatus", "Cancelled" ]},
                            1,
                            0
                        ]
                    }
                },
            }
        }
    ])

    const { pending, confirmed, processing, shipped, delivered, cancelled } = status[0]

    const recentOrders = await Order.find().sort({ createdAt : -1 }).limit(6)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                totalRevenue : result[0].totalRevenue,
                totalOrders,
                totalUsers,
                totalProducts,
                orderStatus : {
                    pending,
                    confirmed,
                    processing,
                    shipped,
                    delivered,
                    cancelled
                },
                recentOrders
            },
            "dashboard stats fetched successfully"
        )
    )
})



export {
    getDashboardStats
}