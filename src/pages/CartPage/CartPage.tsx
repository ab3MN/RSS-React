import { shallowEqual } from 'react-redux';

import { CartComponent } from '@/components/Cart/Cart';
import { useAppSelector } from '@/redux/hooks';
import { cartSelector } from '@/redux/selectors';
import { Container } from '@/UI/Container/Container';
import { EmptyContainer } from '@/UI/EmptyContainer/EmptyContainer';

const CartPage = () => {
  const cart = useAppSelector(cartSelector, shallowEqual);

  return cart.items.length ?
      <Container title="Cart">
        <CartComponent cart={cart} />
      </Container>
    : <EmptyContainer
        title="The Cart is empty"
        pathToImg="/empty-cart.webp"
        alt="empty-order"
      />;
};

export default CartPage;
