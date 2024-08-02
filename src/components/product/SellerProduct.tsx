/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FaPen, FaSave, FaTrash } from 'react-icons/fa';
import ImageSlider from '../images/ImageSlider';
import AddImageSVG from '../svg/AddImageSVG';
import { ISingleProduct } from '../../utils/types/product';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ISingleProductInitialResponse } from '../../utils/types/store';
import { addSellerProduct, fetchSingleSellerProduct, resetUpdateState, updateSellerProduct } from '../../store/features/product/sellerProductSlice';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { Meta } from '../Meta';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/axios/axiosInstance';

const initialProductState: ISingleProduct = {
    id: "",
    shopId: "",
    name: "",
    description: "",
    price: 0,
    discount: "",
    category: "",
    expiryDate: new Date(),
    expired: false,
    bonus: "no bonus",
    images: [],
    quantity: 0,
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
};

const SellerProduct = ({ productId }: { productId: string }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAdd = productId === "add";
    const { product, isError, isLoading, message, isUpdate, newAddedProduct, isUpdateSuccess, updateError }: ISingleProductInitialResponse = useAppSelector((state: any) => state.singleSellerProduct);

    const [updatedProduct, setUpdatedProduct] = useState<ISingleProduct>(initialProductState);
    const [updateImages, setUpdateImages] = useState<File[]>([]);
    const [isImagesUpdated, setIsImagesUpdated] = useState<boolean>(false);
    const [isThereAnyUpdate, setIsThereAnyUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (isUpdate && isUpdateSuccess && !updateError) {
            toast.success(`Product ${isAdd ? "added" : "updated"}`)
            isAdd && newAddedProduct && navigate(`/seller/product/${newAddedProduct.id}`)
            !isAdd && dispatch(fetchSingleSellerProduct(productId));
        }
        else if (updateError) {
            toast.error(updateError || `${isAdd ? "Adding" : "Updating"} a product failed.`)
        }
        dispatch(resetUpdateState())
    }, [isUpdate, isUpdateSuccess, updateError])

    useEffect(() => {
        if (!isAdd) {
            dispatch(fetchSingleSellerProduct(productId));
        }
        else {
            dispatch(resetUpdateState())
            setUpdatedProduct(initialProductState)
        }
    }, [dispatch, productId, isAdd]);

    useEffect(() => {
        if (product && !isAdd) {
            setUpdatedProduct(product);
        }
    }, [product, isAdd]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct(prev => ({ ...prev, [name]: value }));
        setIsThereAnyUpdate(true)
    };

    const handleSaveOrAdd = async () => {
        const formData = new FormData();
        let allowedFields = ['name', 'description', 'price', 'bonus', 'discount', 'category', 'expiryDate', 'quantity'];
        allowedFields.forEach(key => {
            if (updatedProduct[key] !== undefined) {
                formData.append(key, updatedProduct[key].toString());
            }
        });

        if(isAdd && (!updatedProduct.name || !updatedProduct.description || !updatedProduct.price || !updatedProduct.bonus || !updatedProduct.discount || !updatedProduct.category || !updatedProduct.expiryDate || !updatedProduct.quantity)){
            toast.error('Fill all fields please')
            return;
        }
        if(isAdd && updateImages.length < 4){
            toast.error(updateImages.length)
            toast.error('Upload atleast 4 images please')
            return;
        }

        if (isImagesUpdated) {
            const imageBlobs = await Promise.all(updateImages.map(async (base64String: any) => {
                const response = await fetch(base64String);
                const blob = await response.blob();
                return blob;
            }));

            isImagesUpdated && imageBlobs.forEach((blob, index) => {
                formData.append('images', blob, `image${index}.${blob.type.split('/')[1]}`);
            });
        }

        try {
            if (isAdd) {
                dispatch(addSellerProduct(formData));
            } else {
                dispatch(updateSellerProduct({ id: productId, newProductData: formData }));
            }
        } catch (error) {
            toast.error(`Error ${isAdd ? 'adding' : 'updating'} product: ${getErrorMessage(error)}`);
        }
    };

    if (isLoading) {
        return (
            <div className="loader">
                <PuffLoader color="#ff6d18" size={300} loading={isLoading} />
            </div>
        );
    }

    if (isError && !isAdd) {
        return (
            <div className="error-message">
                <p>{message || "Something went wrong. Please try again later."}</p>
                <Link to="/seller/products" className="btn-link">View all my products</Link>
            </div>
        );
    }

    return (
        <>
            <Meta title={`Product ${isAdd ? 'Add' : 'Details'} - ${productId}`} />
            <div className='seller-product-container'>
                <div className="seller-product-header">
                    <h1>{isAdd ? 'Add New Product' : 'Product View'}</h1>
                    <div className="header-btns">
                        <button disabled={!isThereAnyUpdate && !isImagesUpdated} className={`edit-btn ${!isThereAnyUpdate && !isImagesUpdated && 'disabled'}`} onClick={handleSaveOrAdd}>
                            <FaSave /> {isAdd ? "ADD" : "UPDATE"}
                        </button>
                        {!isAdd && <button className='delete-btn'><FaTrash /> Delete</button>}
                    </div>
                </div>

                <div className="cards-holder">
                    <div className="left">
                        <ContentCard title='General Information'>
                            <ContentCard title='Product Name'>
                                <input
                                    type='text'
                                    name="name"
                                    value={updatedProduct.name}
                                    onChange={handleInputChange}
                                    className='content-card-input'
                                />
                            </ContentCard>
                            <ContentCard title='Product Description'>
                                <textarea
                                    name="description"
                                    value={updatedProduct.description}
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
                                    value={updatedProduct.price}
                                    onChange={handleInputChange}
                                    className='content-card-input'
                                />
                            </ContentCard>
                            <ContentCard title='Stock'>
                                <input
                                    type='number'
                                    name="quantity"
                                    value={updatedProduct.quantity}
                                    onChange={handleInputChange}
                                    className='content-card-input'
                                />
                            </ContentCard>
                            <ContentCard title='Discount'>
                                <input
                                    type='text'
                                    name="discount"
                                    value={updatedProduct.discount}
                                    onChange={handleInputChange}
                                    className='content-card-input'
                                />
                            </ContentCard>
                            <ContentCard title='Expiry Date'>
                                <input
                                    type='date'
                                    name="expiryDate"
                                    value={updatedProduct.expiryDate && new Date(updatedProduct.expiryDate).toISOString().split('T')[0]}
                                    onChange={handleInputChange}
                                    className='content-card-input'
                                />
                            </ContentCard>
                        </ContentCard>
                    </div>
                    <div className="right">
                        <ContentCard title='Upload image' className='img-card'>
                            <div className="images-holder-div">
                                <ProductImages initialImages={updatedProduct.images} setUpdateImages={setUpdateImages} setIsImagesUpdated={setIsImagesUpdated} />
                            </div>
                        </ContentCard>
                        <ContentCard title='Category' className='category-card'>
                            <ContentCard title='Product category'>
                                <input
                                    type='text'
                                    name="category"
                                    value={updatedProduct.category}
                                    onChange={handleInputChange}
                                    className='content-card-input'
                                />
                            </ContentCard>
                        </ContentCard>
                    </div>
                </div>
            </div>
        </>
    );
};

const ContentCard = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`content-card-container ${className || ''}`}>
            <div className="content-card-title">{title}</div>
            <div className="content-card-content">
                {children}
            </div>
        </div>
    );
};

const ProductImages = ({ initialImages, setUpdateImages, setIsImagesUpdated }: { initialImages: string[], setUpdateImages: (img: any) => void, setIsImagesUpdated: (newState: boolean) => void }) => {
    const [images, setImages] = useState<string[]>(initialImages);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const convertToBase64 = async () => {
            const base64Images = await Promise.all(
                initialImages.map(async (url) => {
                    if (url.startsWith('data:')) {
                        return url; // Already in base64 format
                    }
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(blob);
                    });
                })
            );
            setImages(base64Images);
            setUpdateImages(base64Images);
        };

        convertToBase64();
        setSelectedImage(0);
    }, [initialImages, setUpdateImages]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images, reader.result as string];
                setImages(newImages);
                setUpdateImages(newImages);
                setIsImagesUpdated(true)
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        setImages(newImages);
        setUpdateImages(newImages);
        setIsImagesUpdated(true);
        if (selectedImage >= newImages.length) {
            setSelectedImage(newImages.length - 1);
        }
    };

    return (
        <div className='images-container'>
            <div className="thumbnails-container">
                {images.map((src, index) => (
                    <div key={index} className="thumbnail-wrapper">
                        <img
                            src={src}
                            alt={`Product Thumbnail ${index + 1}`}
                            className={`thumbnail-image ${selectedImage === index ? 'active' : ''}`}
                            onMouseEnter={() => setSelectedImage(index)}
                        />
                        <button 
                            className="remove-image-button"
                            onClick={() => handleRemoveImage(index)}
                        >
                            ×
                        </button>
                    </div>
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
                {<ImageSlider images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
            </div>
        </div>
    );
};

export default SellerProduct;