import {create} from "zustand"
import axios from "axios"
import {toast} from "react-hot-toast"

export const useCartStore = create((set, get) => ({
    cart:[],
    coupon:null,
    total:0,
    subtotal:0,
    isCouponApplied: false,

    getCartItems: async() => {
        try {
            const res = await axios.get("/api/cart")
            set({cart:res.data})
            get().calculateTotals()
        } catch (error) {
            set({cart: []})
            toast.error(error.response.data.error || "An error has occured")
        }
    },
    addToCart: async (product) => {
        try {
            await axios.post("/api/cart", {productId: product._id})
            toast.success("Product added to cart")

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id)
                const newCart = existingItem
                    ? prevState.cart.map((item) => (item._id === product._id ? {...item, quantity: item.quantity + 1} : item))
                    : [...prevState.cart, {...product, quantity: 1}]
                return {cart: newCart}
            })
            get().calculateTotals()
        } catch (error) {
            toast.error(error.response.data.message || "An error occured")
        }
    },

    calculateTotals: () => {
        const {cart, coupon} = get()
        const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        let total = subTotal

        if(coupon){
            const discount = subTotal * (coupon.discountPercentage / 100)
            total = subTotal - discount
        }

        set({subTotal, total})
    },

    removeFromCart: async (productId) => {
        await axios.delete("/api/cart", {data: {productId}})
        set(prevState => ({cart: prevState.cart.filter(item => item._id !== productId)}))
        get().calculateTotals();
        toast("Removed Successfully", {icon:"🗑️"})
    },
}))