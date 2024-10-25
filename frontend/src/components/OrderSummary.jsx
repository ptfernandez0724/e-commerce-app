import {motion} from "framer-motion"
import { MoveRight } from "lucide-react";
import {Link} from "react-router-dom"
import { useCartStore } from "../stores/useCartStore"

const OrderSummary = () => {
    const {total, subTotal, coupon, isCouponApplied} = useCartStore();

    const savings = subTotal - total;
    const formattedSubTotal = subTotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);

  return (
    <motion.div
        className="space-y-4 py-16 rounded-lg border border-gray-700 bg-gray-800 shadow-sm sm:p-6"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
    >
        <p className="text-xl font-semibold text-slate-400">Order Summary</p>

        <div className="space-y-4">
            <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-300">Original Price</dt>
                    <dd className="text-base font-medium text-white">${formattedSubTotal}</dd>
                </dl>

                {savings > 0 && (
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Savings</dt>
                        <dd className="text-base font-medium text-slate-400">${formattedSavings}</dd>
                    </dl>
                )}

                {coupon && isCouponApplied && (
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Coupon ({coupon.code})</dt>
                        <dd className="text-base font-medium text-slate-400">-${coupon.discountPercentage}%</dd>
                    </dl>
                )}

                <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
                    <dt className="text-base font-bold text-white">Total</dt>
                    <dd className="text-base font-bold text-slate-400">${formattedTotal}</dd>
                </dl>
            </div>

            <motion.button
                className="flex w-full items-center justify-center rounded-lg bg-slate-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                // onClick={handleClick}
            >
                Checkout
            </motion.button>

            <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-400">or</span>
                <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400  hover:text-slate-300 hover:no-underline"
                >
                Continue Shopping
                <MoveRight size={16} />
            </Link>
            </div>
        </div>
    </motion.div>
  )
}

export default OrderSummary