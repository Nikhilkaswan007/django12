import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import { ShoppingCart, Leaf } from 'lucide-react';
import './ProductList.css';
import CartItem from './CartItem';

const plantsArray = [
    {
        category: "Air Purifying",
        plants: [
            {
                name: "Snake Plant",
                image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                description: "Produces oxygen at night, improving air quality.",
                cost: "$15"
            },
            {
                name: "Spider Plant",
                image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                description: "Filters formaldehyde and xylene from the air.",
                cost: "$12"
            },
            {
                name: "Peace Lily",
                image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                description: "Removes mold spores and purifies the air.",
                cost: "$18"
            },
            {
                name: "Boston Fern",
                image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                description: "Adds humidity and purifies air.",
                cost: "$20"
            },
            {
                name: "Rubber Plant",
                image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                description: "Easy to care for and effective at removing toxins.",
                cost: "$22"
            },
            {
                name: "Aloe Vera",
                image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283100_1280.jpg",
                description: "Purifies the air and has medicinal properties.",
                cost: "$14"
            }
        ]
    },
    {
        category: "Aromatic",
        plants: [
            {
                name: "Lavender",
                image: "https://images.unsplash.com/photo-1506174019576-f707ad9029d2?q=80&w=2070&auto=format&fit=crop",
                description: "Calming scent, used in aromatherapy.",
                cost: "$20"
            },
            {
                name: "Mint",
                image: "https://as2.ftcdn.net/v2/jpg/02/24/78/05/1000_F_224780585_Wx9SIpL9vREuU7neMLBaGVy7zGnoL98D.jpg",
                description: "Refreshing aroma, used in cooking and beverages.",
                cost: "$10"
            },
            {
                name: "Rosemary",
                image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                description: "Invigorating scent, used in cooking.",
                cost: "$15"
            },
            {
                name: "Basil",
                image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                description: "Sweet aroma, essential in Italian cuisine.",
                cost: "$9"
            },
            {
                name: "Jasmine",
                image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=2070&auto=format&fit=crop",
                description: "Sweet fragrance, promotes relaxation.",
                cost: "$25"
            },
            {
                name: "Lemon Balm",
                image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                description: "Citrusy scent, used in teas and for stress relief.",
                cost: "$12"
            }
        ]
    },
    {
        category: "Low Maintenance",
        plants: [
            {
                name: "ZZ Plant",
                image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1964&auto=format&fit=crop",
                description: "Thrives in low light and requires minimal watering.",
                cost: "$25"
            },
            {
                name: "Pothos",
                image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816941_1280.jpg",
                description: "Hardy vine that is easy to grow in various conditions.",
                cost: "$10"
            },
            {
                name: "Cast Iron Plant",
                image: "https://cdn.pixabay.com/photo/2017/02/16/15/42/aspidistra-2071743_1280.jpg",
                description: "Tough plant that can survive neglect and low light.",
                cost: "$20"
            },
            {
                name: "Succulent Mix",
                image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                description: "Drought-tolerant plants with unique shapes.",
                cost: "$18"
            },
            {
                name: "Jade Plant",
                image: "https://cdn.pixabay.com/photo/2016/06/19/22/40/crassula-1467647_1280.jpg",
                description: "Symbol of good luck, requires little water.",
                cost: "$15"
            },
            {
                name: "Spider Plant (Variegated)",
                image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                description: "Resilient and easy to propagate.",
                cost: "$12"
            }
        ]
    }
];

function ProductList({ setShowProductList }) {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isAddedToCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        setShowProductList(false);
    };

    return (
        <div className="product-page">
            <nav className="navbar">
                <div className="nav-brand" onClick={handleHomeClick}>
                    <Leaf size={32} color="#4caf50" />
                    <div>
                        <h3>Paradise Nursery</h3>
                        <p>Where Greenery Meets Serenity</p>
                    </div>
                </div>
                <div className="nav-links">
                    <a href="#" onClick={handleHomeClick}>Home</a>
                    <a href="#" onClick={handleContinueShopping}>Plants</a>
                    <a href="#" className="cart-icon-container" onClick={handleCartClick}>
                        <ShoppingCart size={28} />
                        {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                    </a>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-grid-container">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h2 className="category-title">{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div key={plantIndex} className="product-card">
                                        <div className="product-image-container">
                                            <img src={plant.image} alt={plant.name} className="product-image" />
                                        </div>
                                        <div className="product-details">
                                            <h3 className="product-name">{plant.name}</h3>
                                            <p className="product-description">{plant.description}</p>
                                            <p className="product-price">{plant.cost}</p>
                                            <button
                                                className={`add-to-cart-btn ${isAddedToCart(plant.name) ? 'disabled' : ''}`}
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={isAddedToCart(plant.name)}
                                            >
                                                {isAddedToCart(plant.name) ? 'Added' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
