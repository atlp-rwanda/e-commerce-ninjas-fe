/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './../../styles/ProductComponent.scss';
import { IProduct, IProductReview } from '../../utils/types/product';
import { IShop } from '../../utils/types/shop';
import { FaCartPlus, FaRegStar, FaStar } from 'react-icons/fa';
import { FaHeartCircleCheck } from 'react-icons/fa6';

const ProductComponent = ({ productId }: { productId: string }) => {
    const [product, setProduct] = useState<IProduct | null>(null)
    const [shop, setShop] = useState<IShop | null>(null)
    const [reviews, setReviews] = useState<IProductReview[] | null>(null)
    useEffect(() => {
        setProduct(productFromBackend)
        setReviews(reviewsFromBackend)
        setShop(shopFromBackend)
    }, [])
    return (
        <>
            {
                product ?
                    <div className="product-component">
                        <div className="product-container">
                            <ProductImages images={product.images} />
                            {reviews && <ProductDetails product={product} reviews={reviews} />}
                        </div>
                        <DetailsCard title='Product Details'>{product.description}</DetailsCard>
                        {reviews && <DetailsCard title='Customer reviews'><ReviewsCard reviews={reviews} /></DetailsCard>}
                        {shop && <DetailsCard title="Seller's info"><SellerInfoCard shop={shop} /></DetailsCard>}

                    </div>
                    :
                    <div>Error</div>
            }
        </>
    )
};

const ProductImages = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0)
    return (
        <div className='images-container'>
            <div className="thumbnails-container">
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Product Thumbnail ${index + 1}`} className='thumbnail-image' onClick={() => setSelectedImage(index)} />
                ))}
            </div>

            <div className="main-image-container">
                <img src={images[selectedImage]} alt="Main Product Image" className="main-image" />
            </div>
        </div>

    );
}

const ProductDetails = ({ product, reviews }: { product: IProduct, reviews: IProductReview[] }) => {
    const [qty, setQty] = useState(1)
    const addProductToWishlist = () => { return; }
    const addProductToCart = () => { return; }
    return (
        <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <div className='product-stars-and-shipping'>
                <div className="product-review-stars"> <StarsRender count={Math.floor(reviews.reduce((acc, review) => { return acc + review.rating }, 0) / reviews.length)} />{(reviews.reduce((acc, review) => { return acc + review.rating }, 0) / reviews.length).toFixed(1)} </div>
                <div className="shipping-label">Free Shipping</div>
            </div>
            <div className="product-price-container">
                <div className="product-price">{product.price.toLocaleString()} RWF</div>
                <div className="discount-label-container">
                    <div className="discount-label">Discounted price of {product.discount}</div>
                </div>
            </div>
            <div className="quantity-container">
                <label className="quantity-label">Quantity:</label>
                <div className="quantity-input-and-buttons">
                    <button className='quantity-button' onClick={() => setQty(qty - 1)}>-</button>
                    <input type="number" name="quantity" className="quantity-input" value={qty} onChange={(e) => setQty(parseInt(e.target.value))} />
                    <button className='quantity-button' onClick={() => setQty(qty + 1)}>+</button>
                </div>
            </div>
            <div className="action-buttons">
                <button className="wishlist-button" onClick={addProductToWishlist}><FaHeartCircleCheck /> Add to WishList</button>
                <button className="cart-button" onClick={addProductToCart}><FaCartPlus /> Add to cart</button>
            </div>
        </div>
    );
}


const DetailsCard = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <div className="card-container">
            <div className="card-header">
                <div className="card-header-title"><h1>{title}</h1></div>
                <div className="card-header-box"></div>
            </div>
            <div className="card-contents">{children}</div>
        </div>
    )

}

const SellerInfoCard = ({ shop }: { shop: IShop }) => {
    return (
        <div className='seller-info'>
            <div className="seller-profile"><div className="img-holder"><img src={shop.image || 'https://placehold.co/100x100'} alt="Shop" /> </div><span>{shop.name}</span></div>
            <div className="seller-description">{shop.description}</div>
        </div>
    )
}

const ReviewsCard = ({ reviews }: { reviews: IProductReview[] }) => {
    return (
        <div className='reviews-card'>
            <div className="reviews-header">
                <span className='reviews-top-stars'><StarsRender count={Math.floor(reviews.reduce((acc, review) => { return acc + review.rating }, 0) / reviews.length)} />{(reviews.reduce((acc, review) => { return acc + review.rating }, 0) / reviews.length).toFixed(1)} out of 5</span>
                <span>{reviews.length.toLocaleString()} Reviewers</span>
            </div>
            <h2>Top reviewers</h2>
            <div className="reviews">
                {reviews.map(review => <SingleReviewCard review={review} />)}
            </div>
        </div>
    )
}

const SingleReviewCard = ({ review }: { review: IProductReview }) => {
    return (
        <div className='review-card'>
            <div className="reviewer-profile"><div className="img-holder"><img src={review.user?.image || 'https://placehold.co/100x100'} alt="Shop" /> </div><span>{review.user?.name || "Anonymous"}</span></div>
            <div className="review-contents">
                <div className="stars-container"><StarsRender count={review.rating} /></div>
                <div className="review-date">Reviewed on {review.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="review-feedback">{review.feedback}</div>
            </div>
        </div>
    )
}

const StarsRender = ({ count }: { count: number }) => {
    const totalStars = 5;

    return (
        <div className='stars-card'>
            {[...Array(totalStars)].map((_, index) => (
                index < count ? <FaStar key={index} color="#ff6d18" /> : <FaRegStar key={index} color="#ff6d18" />
            ))}
        </div>
    )
}


// variables

const productDescriptionExample = `
Introducing the New 4G S8 Ultra Smart Watch - Ultra Series 8

Experience the pinnacle of technology and style with the New 4G S8 Ultra Smart Watch. Designed for both men and women, this versatile smart watch seamlessly combines functionality with an elegant design, making it the perfect companion for your daily activities and fitness goals.

Key Features:
- 4G Connectivity: Stay connected on the go with fast 4G LTE support, ensuring you can make calls, send messages, and access the internet directly from your wrist.
- Google APP Integration: Enjoy the convenience of Google apps right on your wrist. From maps to music, all your favorite apps are just a tap away.
- WiFi Support: Connect to WiFi networks for faster data access and seamless updates.
- Bluetooth Call and Message Reminder: Never miss an important call or message with Bluetooth connectivity, which keeps you notified without needing to check your phone.
- Fitness and Health Tracking: Monitor your health with features such as heart rate monitoring, sleep tracking, step counting, and more.
- Sports Modes: Track your performance across various sports and activities, providing you with detailed analytics to improve your fitness routine.
- Stylish Design: With a sleek and modern design, the S8 Ultra Smart Watch is a perfect fit for any occasion, whether it's a workout session or a night out.

Specifications:
- Display: High-resolution touchscreen for clear and vibrant visuals.
- Battery Life: Long-lasting battery to keep up with your busy schedule.
- Compatibility: Works with both Android and iOS devices.
- Water Resistance: Built to withstand everyday water exposure, making it suitable for outdoor activities and workouts.

Upgrade your lifestyle with the New 4G S8 Ultra Smart Watch Ultra Series 8. Embrace the future of wearable technology and stay connected, active, and stylish every day.
`


const productFromBackend: IProduct = {
    id: '123',
    name: "New 4G S8 Ultra Smart Watch Ultra Series 8 Google APP WiFi Smart Watch For Men Women Original BT Call Sports Watch",
    description: productDescriptionExample,
    shopId: "shop-id",
    price: 5000,
    discount: "20%",
    category: "Shoes",
    expiryDate: new Date(),
    expired: false,
    bonus: '10%',
    images: ['https://placehold.co/101x101', 'https://placehold.co/102x102', 'https://placehold.co/103x103', 'https://placehold.co/104x104'],
    quantity: 20,
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
}

const shopFromBackend: IShop = {
    id: 'shop-id',
    name: "Modern-Electronics",
    userId: '12sd',
    description: `
    Welcome to Modern-Electronics, the best shop for electronics equipment! We pride ourselves on offering a vast selection of top-quality electronics to meet all your needs. Our store features the latest technology from the most trusted brands, ensuring you get only the best products on the market.

    At Modern-Electronics, we cater to tech enthusiasts, professionals, and everyday consumers alike. Whether you're looking for the newest smartphones, high-performance laptops, state-of-the-art smart home devices, or essential accessories, we've got you covered. Our knowledgeable staff is always on hand to provide expert advice and help you find exactly what you're looking for.

    Our commitment to customer satisfaction sets us apart. We offer competitive prices, regular promotions, and a customer loyalty program that rewards you for every purchase. Our user-friendly website ensures a seamless online shopping experience, complete with detailed product descriptions, customer reviews, and fast, reliable shipping.

    In addition to our extensive product range, we also offer comprehensive after-sales support, including technical assistance and a hassle-free return policy. At Modern-Electronics, we're dedicated to helping you stay ahead of the curve with the latest tech innovations.

    Join our growing community of satisfied customers and discover why Modern-Electronics is the go-to destination for all your electronics needs. Experience the difference today!
    `
}


const reviewsFromBackend: IProductReview[] = [
    {
        id: 'asdfx',
        userId: '123sf',
        productId: 'afvf1',
        feedback: 'Good Product',
        rating: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
            name: 'John Doe',
            image: 'https://placehold.co/50x50'
        }
    },
    {
        id: 'asdfx',
        userId: '123sf',
        productId: 'afvf1',
        feedback: 'Very Good Product',
        rating: 4,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
            name: 'Emmaunel Manzi',
            image: 'https://placehold.co/50x50'
        }
    }
]

export default ProductComponent;
