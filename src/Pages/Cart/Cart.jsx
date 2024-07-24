import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext"; // Assuming you have a StoreContext defined somewhere
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets"; // Import the image
import "./Cart.css";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);

  const validPromoCodes = {
    "DISCOUNT10": 0.10, // 10% discount
    "SAVE20": 0.20,
    "PROMO30": 0.30 
  };

  useEffect(() => {
    handleDelivery();
  }, [cartItems]);

  useEffect(() => {
    const subtotal = calculateSubtotal();
    const deliveryFee = delivery;
    const discountValue = calculateDiscount(subtotal, promoCode);
    const totalValue = subtotal + deliveryFee - discountValue;
    setTotal(totalValue);
    setDiscount(discountValue);
  }, [cartItems, delivery, promoCode]);

  const handleDelivery = () => {
    if (Object.keys(cartItems).length > 0) {
      setDelivery(10);
    } else {
      setDelivery(0);
    }
  };

  const calculateDiscount = (subtotal, promoCode) => {
    if (validPromoCodes[promoCode]) {
      const discount = validPromoCodes[promoCode];
      if (typeof discount === "number") {
        return discount < 1 ? subtotal * discount : discount;
      }
    }
    return 0;
  };

  const handleApplyPromo = () => {
    if (!validPromoCodes[promoCode]) {
      setDiscount(0);
      alert("Invalid promo code");
    } else {
      const subtotal = calculateSubtotal();
      const discountValue = calculateDiscount(subtotal, promoCode);
      setDiscount(discountValue);
      setTotal(subtotal + delivery - discountValue);
    }
  };

  const calculateSubtotal = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = food_list.find((foodItem) => foodItem._id === itemId);
      return item ? total + item.price * cartItems[itemId] : total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = delivery;
  const isEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className="cart" id="cart">
      {isEmpty ? (
        <div className="cart-empty">
          <img src={assets.cart} alt="" className="empty-cart-image" />
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {Object.keys(cartItems).map((itemId) => {
              const item = food_list.find((foodItem) => foodItem._id === itemId);
              if (item && cartItems[itemId] > 0) {
                return (
                  <div key={itemId}>
                    <div className="cart-items-title cart-items-item">
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                      <p>{cartItems[itemId]}</p>
                      <p>₹{item.price * cartItems[itemId]}</p>
                      <p onClick={() => removeFromCart(itemId)} className="cross">
                        X
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null; 
            })}
          </div>
<div className="last-bottom">

   <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{deliveryFee}</p>
              </div>
              <hr />
              {discount > 0 && (
                <div>
                  <div className="cart-total-details">
                    <p>Discount</p>
                    <p>-₹{discount}</p>
                  </div>
                  <hr />
                </div>
              )}
              <div className="cart-total-details">
                <p>Total</p>
                <b>₹{total}</b>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
          </div>

          <div className="cart-promo-code">
            <div className="cart-promo-code-title">Trending Discounts</div>
            <div >
            <div className="cart-promo-code-details"> 
            <div>
               <img src={assets.discount1} alt="" className="discount-image" />
            </div>
            <div className="card">
               <div>Save up to 10% on your order</div>
                <div style={{fontSize:"25px",fontWeight:"bold"}} onClick={() => setPromoCode("DISCOUNT10")}>DISCOUNT10</div>
            </div>
              
                                                    
            </div>
            </div> 
           
          </div>
</div>
         
        </>
      )}
    </div>
  );
};

export default Cart;
