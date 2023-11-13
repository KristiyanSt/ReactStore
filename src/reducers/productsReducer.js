export default function productsReducer(state, action) {
    switch (action.type) {
        case 'PRODUCTS_FETCH':
            return [...action.payload];
        case 'EDIT_PRODUCT':
            return state.map(x => x._id == action.payload._id ? action.payload : x);
        case 'CREATE_PRODUCT':
            return [...state, action.payload];
        case 'DELETE_PRODUCT':
            return state.filter(x => x._id != action.payload.id)
        default:
            return state;
    }
}