import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ExploreMenu = ({ category, setCategory }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 7;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % menu_list.length
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + menu_list.length) % menu_list.length
        );
    };

    const getVisibleItems = () => {
        if (menu_list.length <= itemsToShow) {
            return menu_list;
        }
        let visibleItems = [];
        for (let i = 0; i < itemsToShow; i++) {
            visibleItems.push(menu_list[(currentIndex + i) % menu_list.length]);
        }
        return visibleItems;
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <div className='explore-menu-arrows'>
                <div className='left-arrow' onClick={handlePrev}> <IoIosArrowBack /> </div>
                <div className='right-arrow' onClick={handleNext}> <IoIosArrowForward /> </div> 
            </div>
            <div>
                <h1>Explore our menu</h1>
            </div>
            <p className='explore-menu-text'>"Quench Your Thirst with Pure Perfection – Discover Our Premium Water Selection Today!"</p>
            <div className='explore-menu-list'>
                {getVisibleItems().map((item, index) => (
                    <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-item'>
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
