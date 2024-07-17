/* eslint-disable */
import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { GoDotFill } from "react-icons/go";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ImageSlider = ({ images, selectedImage, setSelectedImage }: { images: string[], selectedImage: number, setSelectedImage: Dispatch<SetStateAction<number>> }) => {

    const [currentIndex, setCurrentIndex] = useState(selectedImage);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const startImageChangeInterval = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
    };

    useEffect(() => {
        startImageChangeInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            startImageChangeInterval();
        }
        setSelectedImage(currentIndex)
    }, [currentIndex]);

    useEffect(()=>{setCurrentIndex(selectedImage)}, [selectedImage])


    return (
        <div className="img-slider-container" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
            <div className="arrow left" onClick={handleLeftClick}>
                <FaChevronCircleLeft className="icon-arrow" />
            </div>
            <div className="arrow right" onClick={handleRightClick}>
                <FaChevronCircleRight className="icon-arrow" />
            </div>
            <div className="dots">
                {images.map((_, index) => (
                    <GoDotFill
                        key={index}
                        className="icon-dots"
                        style={{ color: currentIndex === index ? '#ff6d18' : '#fff', border: '2px solid #ff6d18', borderRadius: '10px' }}
                        onClick={()=>{setCurrentIndex(index)}}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageSlider