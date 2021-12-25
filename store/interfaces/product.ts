import actionTypes from "../action-types/product";

export interface State {
    products: Product[] | null,
    count: number,
    loading: boolean,
    product: Product | null
}

export interface Product {
    productId: number
    productTitle: string
    addedBy: number
    createdAt: string
    updatedAt: string
    isDeleted: number
    productDescription: string
    productPrice: number
    productQuantity: number
}

export interface GetProducts {
    count: number,
    products: Product[]
}

// GET PRODUCTS
interface GetProductsRequestAction {
    type: actionTypes.GET_PRODUCTS_REQUEST
}
interface GetProductsSuccessAction {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: GetProducts
}
interface GetProductsErrorAction {
    type: actionTypes.GET_PRODUCTS_ERROR,
}
// GET ONE PRODUCT
interface GetOneProductRequestAction {
    type: actionTypes.GET_ONE_PRODUCT_REQUEST,
}
interface GetOneProductSuccessAction {
    type: actionTypes.GET_ONE_PRODUCT_SUCCESS,
    payload: Product
}
interface GetOneProductErrorAction {
    type: actionTypes.GET_ONE_PRODUCT_ERROR,
}

// ADD PRODUCT
interface AddProductRequestAction {
    type: actionTypes.ADD_PRODUCT_REQUEST,
}
interface AddProductSuccessAction {
    type: actionTypes.ADD_PRODUCT_SUCCESS,
    payload: Product[]
}
interface AddProductErrorAction {
    type: actionTypes.ADD_PRODUCT_ERROR,
}

// EDIT PRODUCTS
interface EditProductRequestAction {
    type: actionTypes.EDIT_PRODUCT_REQUEST,
}
interface EditProductErrorAction {
    type: actionTypes.EDIT_PRODUCT_ERROR,
}

export type Action = GetProductsRequestAction | GetProductsSuccessAction
    | GetProductsErrorAction | GetOneProductRequestAction | GetOneProductSuccessAction | GetOneProductErrorAction | AddProductRequestAction | AddProductSuccessAction | AddProductErrorAction | EditProductRequestAction | EditProductErrorAction