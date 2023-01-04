import './Product.css';


export interface IProduct {
    image: string;
    title: string;
    price: number;
    description: string;
}

interface IProps{
    item:IProduct
}

const Product: React.FC<IProps> = (props) => {
    return (
        <div className="product">
            <div className="product-image-wrapper">
              <img className='product-image' src={props.item.image} alt=''/>
            </div>
            <div className="product-title">
               {props.item.title}
            </div>
            <div className="product-price">
                {props.item.price} ₽.
            </div>
            <div className="product-description">
                Описание:  
                {props.item.description}
            </div>
        </div>
    );
};
export default Product;
