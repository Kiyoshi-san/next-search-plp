import React, {useEffect} from "react";
import classes from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { userSession } from '../../redux/actions';
import { Link } from "next/router";
import Rating from "../Rating/Rating";

export default function Product(props) {
    const { product, wished } = props;
    const dispatch = useDispatch();
    const userSessionReg = useSelector(state => state.userSession);

    const handlewishItem = async () => {
        const idUser = userSessionReg._id;
        let wishedProducts = userSessionReg.wishedProducts;

        if(wishedProducts.includes(product.id)) {
            wishedProducts = wishedProducts.filter(function (item) {
                return item !== product.id;
            });
        } else {
            wishedProducts.push(product.id);
        }

        const data = await fetch("/api/wishItem", {
            method: "POST",
            body: JSON.stringify({ idUser, wishedProducts }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await data.json();
        
        dispatch(userSession(res));
        localStorage.setItem("userData", JSON.stringify(res));
    };
    
    return (
        <div key={product.id} className={classes.productCardContainer}>
            <div
                className={`${classes.wishContainer} ${wished ? classes.wished : ""}`}
                onClick={handlewishItem}
            >
                {wished}
                <i className={`fa fa-heart`}></i>
            </div>
            <div className={classes.productImgBox}>
                <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="title">{product.title}</div>
            <div className={classes.ratingsContainer}>
                <Rating
                    rating={product.installments?.rate}
                ></Rating>
            </div>
        </div>
    );
}
