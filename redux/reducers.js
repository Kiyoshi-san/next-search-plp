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

export const userSessionReducer = (state = {}, action) => {
    switch (action.type) {
    case USER_SESSION:
        return action.payload;
    default:
        return state;
    }
}

export const showMenuReducer = (state = false, action) => {
    switch (action.type) {
    case SHOW_MENU_MOBILE:
        return action.payload;
    default:
        return state;
    }
}

export const categoryListReducer = (
    state = {loading: false, categories: []},
    action
) => {
    switch (action.type) {
    case CATEGORY_LIST_REQUEST:
        return { loading: true };
    case CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
    default:
        return state;
    }
}

export const productListReducer = (
    state = {loading: false, products: []},
    action
) => {
    switch (action.type) {
    case PRODUCT_LIST_REQUEST:
        return { loading: true };
    case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
    default:
        return state;
    }
}