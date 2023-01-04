import Product , {IProduct} from './components/Product'
import './Products.css';
import tour1 from '../../assets/tour1.jpg';
import tour2 from '../../assets/tour2.png';
import tour3 from '../../assets/tour3.jpg';
import tour4 from '../../assets/tour4.jpg';

const Products: React.FC = () => {
    const products: IProduct[] = [
        {
            image: tour1,
            title: 'Туры',
            price: 0,
            description: 'Описание',
        },
        {
            image: tour2,
            title: 'Туры',
            price: 0,
            description: 'Описание',
        },
        {
            image: tour3,
            title: 'Туры',
            price: 0,
            description: 'Описание',
        },
        {
            image: tour4,
            title: 'Туры',
            price: 0,
            description: 'Описание',
        }
    ]
    return (
        <div className="products">
            {
                products.map ((item) => <Product item={item} />)
            }
        </div>
       
    );
};
export default Products;