export const initialState = {
  basket: [
    // {
    //   id: "123321",
    //   title: "Lorem ipsum dolor sit amet.",
    //   price: 3520,
    //   image:
    //     "https://images-na.ssl-images-amazon.com/images/I/41TEawIMRfL._AC_SY200_.jpg",
    //   rating: 3,
    // },
  ],
  user: null,
};

//Selector
export const getBasketTotal = (basket) => {
  return +basket?.reduce(
    (amount, item) => +amount + +item.price * +item.count,
    0
  );
};

export const getProductCount = (basket) => {
  return +basket.reduce((amount, item) => +amount + +item.count, 0);
};

export const reducer = (state, action) => {
  let index;
  let newBasket = [...state.basket];
  switch (action.type) {
    case "ADD_TO_BASKET":
      index = state.basket.findIndex((item) => item.id === action.item.id);
      if (index >= 0) {
        newBasket[index].count = +newBasket[index].count + 1;
        if (+newBasket[index].count > 10) {
          alert("Can't buy more than 10 items");
          newBasket[index].count = 10;
        }
        return { ...state, basket: newBasket };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, count: 1 }],
        };
      }
    case "REMOVE_FROM_BASKET":
      index = state.basket.findIndex((item) => item.id === action.item.id);
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "CHANGE_PRODUCT_COUNT":
      index = state.basket.findIndex((item) => item.id === action.item.id);
      newBasket[index].count = action.item.count;
      console.log("change count: ", newBasket[index].count);
      return { ...state, basket: newBasket };
    case "EMPTY_BASKET":
      return { ...state, basket: [] };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

// id="123321"
// title="Lorem ipsum dolor sit amet."
// price={3520}
// image="https://images-na.ssl-images-amazon.com/images/I/41TEawIMRfL._AC_SY200_.jpg"
// rating={3}
