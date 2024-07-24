import React,{useContext} from 'react'
import "./FoodItem.css";
import { FaMinus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";

 import { IoAddOutline } from "react-icons/io5";
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
  
  const{cartItems,addToCart,removeFromCart}=useContext(StoreContext)


  return (
    <div className="food-item">
        <div className='food-item-img-container'>
            <img className="food-item-image" src={image}  alt=""/>
            {
              !cartItems[id] 
              ?<div className='add'onClick={()=>addToCart(id)} >Add to cart</div>
             : <div className='food-item-counter'>
                 <FaMinus className='minus' onClick={()=>removeFromCart(id)}/>
                  <p style={{color:"blue"}}>{cartItems[id]}</p>
                 
                  <LuPlus  className="plus"onClick={()=>addToCart(id)}/>
              </div>
            }
        </div>
        <div className="food-item-info">
                <div className="food-item-name-rating">
               <p>{name}</p> 
                </div>
        </div>
        <p className='food-item-description'>{description}</p>
        <p className="food-item-price">₹{price}</p>
    </div>
  )
}

export default FoodItem;