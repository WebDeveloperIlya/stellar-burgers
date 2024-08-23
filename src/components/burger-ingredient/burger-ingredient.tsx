import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { createOrder } from '../../services/api';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const handleAdd = () => {
      console.log('Ингредиент добавлен в заказ');
      const ingredientIds = ['111'];

      createOrder(ingredientIds)
        .then((response) => {
          console.log('Заказ создан:', response);
        })
        .catch((error) => {
          console.error('Ошибка при создании заказа:', error);
        });
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
