import React, { useContext, useState, useEffect } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, food_list } = useContext(StoreContext);
  const [delivery, setDelivery] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const validPromoCodes = {
    "DISCOUNT10": (total) => total / 10,
    "SAVE20": (total)=>total*0.20,
    "PROMO30": (total)=>total*0.30
  };

  useEffect(() => {
    handleDelivery();
  }, [cartItems]);

  const handleDelivery = () => {
    if (Object.keys(cartItems).length > 0) {
      setDelivery(10);
    } else {
      setDelivery(0);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleApplyPromo = () => {
    if (validPromoCodes[promoCode]) {
      setDiscount(validPromoCodes[promoCode](subtotal));
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const handleSubmit = () => {
    if (!isEmpty && validateForm()) {
      navigate("/order");
    } else {
      alert("Please fill in all the fields and ensure your cart is not empty.");
    }
  };

  const validateForm = () => {
    return Object.values(formData).every(field => field.trim() !== '');
  };

  const calculateSubtotal = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = food_list.find((foodItem) => foodItem._id === itemId);
      return item ? total + item.price * cartItems[itemId] : total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = delivery;
  const total = subtotal + deliveryFee - discount;
  const isEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} />
        </div>
        <input type="text" name="address" placeholder='Address' value={formData.address} onChange={handleChange} />
        <input type="text" name="street" placeholder='Street' value={formData.street} onChange={handleChange} />
        <div className='multi-fields'>
          <input type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange} />
          <input type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange} />
        </div>
        <div className='multi-fields'>
          <input type="text" name="zipCode" placeholder='Zip code' value={formData.zipCode} onChange={handleChange} />
          <input type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange} />
        </div>
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className='place-order-right'>
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
              <>
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>-₹{discount}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Total</p>
              <b>₹{total}</b>
            </div>
          </div>
          <button onClick={handleSubmit}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <br />
        <br/>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
