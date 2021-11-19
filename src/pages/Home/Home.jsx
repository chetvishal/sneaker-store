import React, { useState } from 'react';
import { Card } from '../../components/index';
import { useDataContext } from '../../context/dataContextProvider';
import styles from './Home.module.css';
import Load from '../../assets/3.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Home = ({ input, setInput }) => {

    const { state, dispatch } = useDataContext();
    const { cart, wishList } = state;
    const [sliderVal, setSliderVal] = useState(989);
    const [brands, setBrands] = useState([])

    const handleDropDownChange = (e) => {
        dispatch({ type: "SORT", payload: e.target.value })
    }

    const handleSlider = (e) => {
        setSliderVal(() => e.target.value);
    }

    const handleBrandsChange = e => {
        e.target.checked ? setBrands([...brands, e.target.name]) : setBrands(brands.filter(i => i !== e.target.name))
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

    //filter by brands
    const filterByBrands = (itemArr, brandsList) => {
        let products = []

        itemArr.map(i => {
            brandsList.forEach(element => {
                if (i.name.toLowerCase().includes(element.toLowerCase())) {
                    products.push(i);
                }
            })
            return i;
        })

        return brandsList.length !== 0 ? products : itemArr;
    }

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
    const filterBrands = filterByBrands(sortedData, brands)
    // const FilteredData = getFilteredData(sortedData, state);
    const FilteredData = getFilteredData(filterBrands, state);

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


                    {/* BRANDS */}
                    <span className="util-heading-small">Brands</span>
                    <label className={styles.filterCheckboxContainer}>
                        <input
                            type="checkbox"
                            name="Nike"
                            onChange={handleBrandsChange}
                        />
                        Nike
                    </label>
                    <label className={`${styles.filterCheckboxContainer} filter-element`}>
                        <input
                            type="checkbox"
                            name="Adidas"
                            onChange={handleBrandsChange}
                        />
                        Adidas
                    </label>
                    <label className={`${styles.filterCheckboxContainer} filter-element`}>
                        <input
                            type="checkbox"
                            name="jordan"
                            onChange={handleBrandsChange}
                        />
                        Jordans
                    </label>
                    <label className={`${styles.filterCheckboxContainer} filter-element`}>
                        <input
                            type="checkbox"
                            name="Champion"
                            onChange={handleBrandsChange}
                        />
                        Champion
                    </label>
                    <label className={`${styles.filterCheckboxContainer} filter-element`}>
                        <input
                            type="checkbox"
                            name="gucci"
                            onChange={handleBrandsChange}
                        />
                        Gucci
                    </label>

                    <div className={`search-box ${styles.searchFilter}`} style={{marginTop: "1rem"}}>
                            <input type="text" onChange={e => setInput(e.target.value)} className="nav-inputbox"
                                placeholder="Search"
                                style={{textAlign: "left"}}
                            />
                    </div>
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