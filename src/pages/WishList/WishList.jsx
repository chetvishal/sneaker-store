import { useDataContext } from '../../context/cartContextProvider';
import { Card } from '../../components/index';
import './wishlist.css';
import { Heart } from '../../assets/index.js';

export const WishList = () => {

    const { state } = useDataContext();
    const { wishList, cart, products } = state;

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

    const newList = wishList.map(item => {
        return {
            ...item,
            inWishList: true,
            inCart: cart.find(cartItem => cartItem._id._id === item._id._id) ? true : false,
        }
    })
    const finalList = inCartAndWishList(products)
    console.log("finalList: ", finalList);
    console.log("newList: ", newList);

    return (
        <div className="wishListComponent">
            <span className="util-heading-medium">
                <div className="wishlist-heading">
                    WISHLIST
                    <Heart style={{ width: "2rem", marginLeft: "1rem" }} />
                </div>
            </span>
            <div className="wishList">
                {newList.map(i => {
                    const data = { ...i._id, inWishList: i.inWishList, inCart: i.inCart }
                    console.log("data from: ", data)
                    return i.inWishList ? <Card key={i._id} data={{ ...i._id, inWishList: i.inWishList, inCart: i.inCart }} /> : null
                })}
            </div>
        </div>
    )
}