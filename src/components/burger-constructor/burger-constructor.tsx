import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { createOrder } from '../../slices/ordersSlice'; // Пример действия для создания заказа
import {
  setOrderRequest,
  setOrderModalData
} from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем данные из хранилища
  const constructorItems = useSelector((state: RootState) => state.constructor);
  const {
    bun,
    ingredients = [],
    orderRequest,
    orderModalData
  } = constructorItems;

  const onOrderClick = async () => {
    if (!bun || orderRequest) return;

    const ingredientIds = ingredients.map((ingredient) => ingredient.id);
    if (bun) {
      ingredientIds.push(bun.id);
    }

    dispatch(setOrderRequest(true));

    try {
      const resultAction = await dispatch(createOrder(ingredientIds));
      if (createOrder.fulfilled.match(resultAction)) {
        dispatch(setOrderModalData(resultAction.payload));
      } else {
        console.error('Order creation failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      dispatch(setOrderRequest(false));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  // Обработка случаев, когда данные могут быть неопределены
  const price = useMemo(() => {
    if (!bun || !ingredients) return 0;

    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      )
    );
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
