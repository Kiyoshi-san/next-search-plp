import { server } from '../config';
import {
    USER_SESSION,
    SHOW_MENU_MOBILE,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from "./constants";

export const userSession = (data) => async(dispatch) => {
    dispatch({ type: USER_SESSION, payload: data });
}

export const showMenu = (show) => async(dispatch) => {
    dispatch({ type: SHOW_MENU_MOBILE, payload: show });
}

export const listCategories = () => async (dispatch) => {
    dispatch({
        type: CATEGORY_LIST_REQUEST,
    });
    try {
        const data = await fetch(`${server}/api/categories`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await data.json();
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: res });
    } catch(error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.massage })
    }
}

export const listProducts = ({
    search = ""
}) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const data = await fetch(`${server}/api/products?search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const res = await data.json();
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res });
    } catch(error) {
        console.log(error);
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.massage })
    }
}