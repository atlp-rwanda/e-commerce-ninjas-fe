/* eslint-disable */
import React, { useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import ImageSlider from '../images/ImageSlider'

const SellerProduct = ({ productId }: { productId: string }) => {
    const images = ["https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s", "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"];
    return (
        <div className='seller-product-container'>
            <div className="seller-product-header">
                <h1>Product View</h1>
                <div className="header-btns">
                    <button className='edit-btn'><FaPen /> Edit</button>
                    <button className='delete-btn'><FaTrash /> Delete</button>
                </div>
            </div>
            
            <div className="cards-holder">
                <div className="left">
                    <ContentCard title='General Information'>
                        <ContentCard title='Product Name'>
                            <h3>Laptop HP 640 G3 - For multi tasks</h3>
                        </ContentCard>
                        <ContentCard title='Product Description'>
                            <p>Laptop HP 640 G3 - For multi tasks Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate cum animi sapiente repudiandae suscipit, ducimus facere consequatur dolor nobis necessitatibus, repellat enim itaque vero magni tenetur.</p>
                        </ContentCard>
                    </ContentCard>
                    <ContentCard title="Pricing and Stock" className='pricing-card'>
                        <ContentCard title='Base Pricing'>
                            <h3>100$</h3>
                        </ContentCard>
                        <ContentCard title='Stock'>
                            <h3>50</h3>
                        </ContentCard>
                        <ContentCard title='Discount'>
                            <h3>5%</h3>
                        </ContentCard>
                        <ContentCard title='Expiry Date'>
                            <h3>2030-12-12</h3>
                        </ContentCard>
                    </ContentCard>
                </div>
                <div className="right">
                    <ContentCard title='Upload image' className='img-card'>
                        <div className="images-holder-div">
                        <ProductImages images={images}/>
                        </div>
                    </ContentCard>
                    <ContentCard title='Category' className='category-card'>
                        <ContentCard title='Product category'>
                            <p>Electronic</p>
                        </ContentCard>
                    </ContentCard>
                </div>
            </div>
        </div>
    )
}

const ContentCard = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`content-card-container ${className && className}`}>
            <div className="content-card-title">{title}</div>
            <div className="content-card-content">
                {children}
            </div>
        </div>
    )
}

const ProductImages = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0)
    return (
        <div className='images-container'>
            <div className="thumbnails-container">
                {images.slice(0, 4).map((src, index) => (
                    <img key={index} src={src} alt={`Product Thumbnail ${index + 1}`} className={`thumbnail-image ${selectedImage === index && 'active'}`} onMouseEnter={() => setSelectedImage(index)} />
                ))}
            </div>

            <div className="main-image-container">
                <ImageSlider images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            </div>
        </div>

    );
}

export default SellerProduct