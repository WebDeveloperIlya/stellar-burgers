import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  addToConstructor,
  clearOrder,
  getConstructorItems,
  getOrderModalData,
  getOrderRequest,
  createOrder
} from '../../services/slices/Burger--ConstructorSlice';
import { selectIsAuthenticated } from '../../services/slices/UserSlice';
import { TConstructorIngredient, TOrder } from '../../utils/types';
import { BurgerConstructorUI } from '../ui';

export const BurgerConstructor: FC = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => getConstructorItems(state));
  const orderRequest = useSelector((state) => getOrderRequest(state));
  const orderModalData = useSelector((state) => getOrderModalData(state));
  const authorized = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    if (!authorized) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    // Создаем объект TOrder
    const order: TOrder = {
      _id: 'generated-id', // Используйте реальный идентификатор
      status: 'pending', // Используйте реальный статус
      name: 'Burger Order', // Название заказа
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: 0, // Номер заказа будет присвоен сервером
      ingredients: [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ]
    };

    // Передаем объект TOrder и диспатчим thunk
    dispatch(createOrder(order.ingredients));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, ingredient: TConstructorIngredient) => s + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      {...props} // Передаем все остальные пропсы
    />
  );
};
