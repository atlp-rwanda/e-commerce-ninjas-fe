/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import ImageSlider from '../images/ImageSlider'
import AddImageSVG from '../svg/AddImageSVG';
import { ISingleProduct } from '../../utils/types/product';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ISingleProductInitialResponse } from '../../utils/types/store';
import { fetchSingleSellerProduct } from '../../store/features/product/sellerProductSlice';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { Meta } from '../Meta';

const SellerProduct = ({ productId }: { productId: string }) => {
    const dispatch = useAppDispatch();
    const { product, isError, isSuccess, isLoading, message }: ISingleProductInitialResponse = useAppSelector((state: any) => state.singleSellerProduct);

    const [updatedProduct, setUpdatedProduct] = useState<ISingleProduct | null>(null);

    useEffect(() => {
        dispatch(fetchSingleSellerProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);
        }
    }, [product]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct(prev => prev ? ({ ...prev, [name]: value }) : null);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct(prev => prev ? ({ ...prev, [name]: new Date(value) }) : null);
    };

    const handleSave = () => {
        console.log('Updated product:', updatedProduct);
    };

    return (
        <>
            <Meta title={`Product details - ${productId}`} />
            {isLoading ? (
                <div className="loader">
                    <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
                </div>
            ) : isError ? (
                <div className="error-message">
                    <p>{message || "Something went wrong. Please try again later."}</p>
                    <Link to="/seller/products" className="btn-link">View all my products</Link>
                </div>
            ) : (
                updatedProduct ?
                    <div className='seller-product-container'>
                        <div className="seller-product-header">
                            <h1>Product View</h1>
                            <div className="header-btns">
                                <button className='edit-btn' onClick={handleSave}><FaPen /> Save</button>
                                <button className='delete-btn'><FaTrash /> Delete</button>
                            </div>
                        </div>

                        <div className="cards-holder">
                            <div className="left">
                                <ContentCard title='General Information'>
                                    <ContentCard title='Product Name'>
                                        <input
                                            type='text'
                                            name="name"
                                            value={updatedProduct.name || ''}
                                            onChange={handleInputChange}
                                            className='content-card-input'
                                        />
                                    </ContentCard>
                                    <ContentCard title='Product Description'>
                                        <textarea
                                            name="description"
                                            value={updatedProduct.description || ''}
                                            className='content-card-input'
                                            rows={11}
                                            onChange={handleInputChange}
                                        />
                                    </ContentCard>
                                </ContentCard>
                                <ContentCard title="Pricing and Stock" className='pricing-card'>
                                    <ContentCard title='Base Pricing'>
                                        <input
                                            type='number'
                                            name="price"
                                            value={updatedProduct.price || ''}
                                            onChange={handleInputChange}
                                            className='content-card-input'
                                        />
                                    </ContentCard>
                                    <ContentCard title='Stock'>
                                        <input
                                            type='number'
                                            name="quantity"
                                            value={updatedProduct.quantity || ''}
                                            onChange={handleInputChange}
                                            className='content-card-input'
                                        />
                                    </ContentCard>
                                    <ContentCard title='Discount'>
                                        <input
                                            type='text'
                                            name="discount"
                                            value={updatedProduct.discount || ''}
                                            onChange={handleInputChange}
                                            className='content-card-input'
                                        />
                                    </ContentCard>
                                    <ContentCard title='Expiry Date'>
                                        <input
                                            type='date'
                                            name="expiryDate"
                                            value={updatedProduct.expiryDate ? new Date(updatedProduct.expiryDate).toISOString().split('T')[0] : ''}
                                            onChange={handleDateChange}
                                            className='content-card-input'
                                        />
                                    </ContentCard>
                                </ContentCard>
                            </div>
                            <div className="right">
                                <ContentCard title='Upload image' className='img-card'>
                                    <div className="images-holder-div">
                                        <ProductImages initialImages={updatedProduct.images} />
                                    </div>
                                </ContentCard>
                                <ContentCard title='Category' className='category-card'>
                                    <ContentCard title='Product category'>
                                        <input
                                            type='text'
                                            name="category"
                                            value={updatedProduct.category || ''}
                                            onChange={handleInputChange}
                                            className='content-card-input'
                                        />
                                    </ContentCard>
                                </ContentCard>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='error-message'>
                        <p>Product was not found</p>
                        <Link to="/seller/products" className="btn-link">View all my products</Link>
                    </div>
            )}
        </>
    )
}

const ContentCard = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`content-card-container ${className || ''}`}>
            <div className="content-card-title">{title}</div>
            <div className="content-card-content">
                {children}
            </div>
        </div>
    )
}

const ProductImages = ({ initialImages }: { initialImages: string[] }) => {
    const [images, setImages] = useState<string[]>(initialImages);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        setImages(initialImages);
        setSelectedImage(0);
    }, [initialImages]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prevImages => [...prevImages, reader.result as string]);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className='images-container'>
            <div className="thumbnails-container">
                {images && images.length > 0 && images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Product Thumbnail ${index + 1}`}
                        className={`thumbnail-image ${selectedImage === index ? 'active' : ''}`}
                        onMouseEnter={() => setSelectedImage(index)}
                    />
                ))}
                <div className="thumbnail-image image-input-div">
                    <label htmlFor='image'>
                        <AddImageSVG width={50} height={50} className='image-choser' />
                        <input
                            type='file'
                            className='image-input'
                            id='image'
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>

            <div className="main-image-container">
                <ImageSlider images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            </div>
        </div>
    );
};

export default SellerProduct