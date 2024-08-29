import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '../ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData,
  createOrder,
  clearOrder
} from '../../services/slices/Burger--ConstructorSlice';
import { selectIsAuthenticated } from '../../services/slices/UserSlice';
import { RootState } from '../../services/store'; // Import RootState

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state: RootState) =>
    getConstructorItems(state)
  );
  const orderRequest = useSelector((state: RootState) =>
    getOrderRequest(state)
  );
  const orderModalData = useSelector((state: RootState) =>
    getOrderModalData(state)
  );
  const authorized = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    if (!authorized) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ].filter(Boolean);

    dispatch(createOrder(order));
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
    />
  );
};
