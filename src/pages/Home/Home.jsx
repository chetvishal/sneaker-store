import React, { useState } from 'react';
import { Card } from '../../components/index';
import { useDataContext } from '../../context/dataContextProvider';
import styles from './Home.module.css';
import Load from '../../assets/3.gif';

export const Home = ({ input }) => {

    const { state, dispatch } = useDataContext();
    const { cart, wishList } = state;
    const [sliderVal, setSliderVal] = useState(989);

    const handleDropDownChange = (e) => {
        dispatch({ type: "SORT", payload: e.target.value })
    }

    const handleSlider = (e) => {
        setSliderVal(() => e.target.value);
    }

    const inCartAndWishList = (itemArr) => {

        const newArr = itemArr.map(item => {
            return {
                ...item,
                inCart: cart.find(cartItem => cartItem._id._id === item._id) ? true : false,
                inWishList: wishList.find(wishItem => wishItem._id._id === item._id) ? true : false
            }
        })
        return newArr;
    }

    //Function to sort products array
    const sortData = (itemArr, sort) => {
        if (sort === "ascending") {
            return itemArr.sort((a, b) => b.price - a.price);
        } else if (sort === "descending")
            return itemArr.sort((a, b) => a.price - b.price);
        else return itemArr;
    };

    //Function to filter products array
    const getFilteredData = (itemArr, { showInventoryAll, showFastDelivery }) => {

        let newArr = itemArr;

        if (showFastDelivery) {
            newArr = newArr.filter((item) => item.fastDelivery);
        }
        newArr = newArr.filter((item) => (showInventoryAll ? true : item.inStock));
        return newArr;
    };

    const checkData = inCartAndWishList(state.products)
    const sortedData = sortData(checkData, state.sort);
    const FilteredData = getFilteredData(sortedData, state);

    return (
        <div className={styles.home}>
            <div className={styles.filters}>
                <div className={styles.filtersComponent}>
                    <span className="util-heading-medium">Filters</span>

                    <span className="util-heading-small">Sort</span>
                    <span className={`${styles.dropDownContainer} ${styles.filterElement}`}>
                        <label htmlFor="sort-price" className="a-native-dropdown">Sort by:</label>
                        <select name="cars" id="sort-price" onChange={handleDropDownChange}>
                            <option
                                value="none"
                            >Relevance</option>
                            <option
                                value="ascending"
                                onClick={() => dispatch({ type: "SORT", payload: "ascending" })}
                            >Price: High to Low</option>
                            <option
                                value="descending"
                                onClick={() => dispatch({ type: "SORT", payload: "descending" })}
                            >Price: Low to High</option>
                        </select>
                    </span>
                    <br />
                    <br />

                    <span className="util-heading-small">Range</span>
                    <input
                        type="range"
                        min={15}
                        max={989}
                        value={sliderVal}
                        className={`${styles.slider} ${styles.filterElement}`}
                        onChange={handleSlider} >
                        </input> ₹{sliderVal}


                    {/* FILTERING INPUT ELEMENTS */}
                    <span className="util-heading-small">Filter by</span>
                    <label className={styles.filterCheckboxContainer}>
                        <input
                            type="checkbox"
                            checked={state.showInventoryAll}
                            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
                        />
                        Include out of stock
                    </label>
                    <label className={`${styles.filterCheckboxContainer} filter-element`}>
                        <input
                            type="checkbox"
                            checked={state.showFastDelivery}
                            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
                        />
                        Fast delivery only
                    </label>
                </div>
            </div>

            <div className={styles.productsList}>
                {
                    FilteredData.length === 0 ?

                        <img src={Load} alt="loading" /> :
                        FilteredData.map(i =>
                            i.name.toLowerCase().includes(input.toLowerCase()) &&
                                i.price < Number(sliderVal) ?
                                <Card key={i._id} data={i} /> : null)
                }
            </div>
        </div>
    )
}