import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
   
    const { food_list } = useContext(StoreContext);

    
    const filteredFoodList = category && category !== "All"
        ? food_list.filter(item => item.category === category)
        : food_list;

    return (
        <div className='food-display' id="food-display">
            <h2>Top Water Bottles near you</h2>
            <div className='food-display-list'>
                {filteredFoodList.map(item => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
