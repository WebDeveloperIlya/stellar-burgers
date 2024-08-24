import {
  getIngredientsApi,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';

export const fetchIngredients = async () => {
  try {
    const ingredients = await getIngredientsApi();
    return ingredients;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};

export const fetchFeeds = async () => {
  try {
    const feeds = await getFeedsApi();
    return feeds;
  } catch (error) {
    console.error('Error fetching feeds:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (ingredients: string[]) => {
  try {
    const newOrder = await orderBurgerApi(ingredients);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const fetchOrderByNumber = async (number: number) => {
  try {
    const order = await getOrderByNumberApi(number);
    return order;
  } catch (error) {
    console.error('Error fetching order by number:', error);
    throw error;
  }
};

export const registerUser = async (userData: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const user = await registerUserApi(userData);
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const user = await loginUserApi(loginData);
    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await forgotPasswordApi({ email });
  } catch (error) {
    console.error('Error sending forgot password request:', error);
    throw error;
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    await resetPasswordApi({ password, token });
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const user = await getUserApi();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (
  userData: Partial<{ email: string; name: string; password: string }>
) => {
  try {
    const updatedUser = await updateUserApi(userData);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await logoutApi();
    localStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
