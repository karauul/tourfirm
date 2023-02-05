import Product, { IProduct } from './components/Product';
import './Products.css';
import tour1 from '../../assets/tour1.jpg';
import tour2 from '../../assets/tour2.png';
import tour3 from '../../assets/tour3.jpg';
import tour4 from '../../assets/tour4.jpg';

interface IProps {
  handleAddItemToCart: (product: IProduct) => void;
  cartItems: IProduct[];
  handleOpenCart: () => void;
}

const Products: React.FC<IProps> = (props: IProps) => {
  const products: IProduct[] = [
    {
      id: 1,
      image: tour1,
      title: 'Туры',
      price: 10,
      description: 'Описание',
    },
    {
      id: 2,
      image: tour2,
      title: 'Туры',
      price: 500,
      description: 'Описание',
    },
    {
      id: 3,
      image: tour3,
      title: 'Туры',
      price: 100000,
      description: 'Описание',
    },
    {
      id: 4,
      image: tour4,
      title: 'Туры',
      price: 30000,
      description: 'Описание',
    },
  ];

  return (
    <div className="products">
      {products.map(item => (
        <Product
          key={item.id}
          item={item}
          handleAddItemToCart={props.handleAddItemToCart}
          cartItems={props.cartItems}
          handleOpenCart={props.handleOpenCart}
        />
      ))}
    </div>
  );
};

export default Products;
