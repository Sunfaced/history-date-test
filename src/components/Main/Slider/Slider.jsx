import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import { timelineData } from '../../../data/data';
import { correctTimelineData } from '../../../data/newData';


// Import styles
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.scss';

const Slider = ({ info, changeIndex, currentIndex, timeLineLength }) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [swiper, setSwiper] = useState(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const totalSlides = correctTimelineData[0].info.length;

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    const handlePrevClick = () => {
        swiper?.slidePrev();
        setShowLeftButton(false);
        
    };

    const handleNextClick = () => {
        swiper?.slideNext();
        setShowLeftButton(true);
        // changeIndex(currentIndex + 1);
    };

    const handleLeftClick = () => {
        if (currentIndex === 0) {
            changeIndex(timeLineLength);
        }else{
            changeIndex(currentIndex - 1);
        }

    };
    const handleRightClick = () => {
        if (currentIndex === timeLineLength) {
            changeIndex(0);
        }else{
            changeIndex(currentIndex + 1);
        }
    };

    

    return (
        <div className="slider-container">
            <div className="slider-controls">
                <div className="counter">{formatNumber(currentIndex + 1)}/{formatNumber(timeLineLength + 1)}</div>
                <div className="navigation-buttons">
                    <button onClick={handleLeftClick} className="prev-button" aria-label="Previous slide">
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                            <path d="M7 1L2 6L7 11" stroke="#42567A" strokeWidth="2"/>
                        </svg>
                    </button>
                    <button onClick={handleRightClick} className="next-button" aria-label="Next slide">
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                            <path d="M1 1L6 6L1 11" stroke="#42567A" strokeWidth="2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="slider-content">
                <div className="navigation-buttons-left">
                    {showLeftButton && (
                        <button className="prev-button-left" aria-label="Previous slide" onClick={handlePrevClick}>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                                <path d="M7 1L2 6L7 11" stroke="#42567A" strokeWidth="2"/>
                            </svg>
                        </button>
                    )}
                </div>
                <div className="slider-wrapper" key={currentIndex}>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView="auto"
                        spaceBetween={80}
                        navigation={{
                            prevEl: '.prev-button, .prev-button-left',
                            nextEl: '.next-button, .next-button-right'
                        }}
                        onSwiper={setSwiper}
                        onSlideChange={(swiper) => {
                            setCurrentSlide(swiper.realIndex + 1);
                    
                            const direction = swiper.activeIndex - swiper.previousIndex;
                            if (direction > 0 || (direction < -1 && swiper.isEnd)) {
                                setShowLeftButton(true); 
                            } else {
                                setShowLeftButton(false);
                            }
                        }}
                        className="custom-swiper"
                        loop={true}
                        observer={true}
                        observeParents={true}
                        speed={800}
                        grabCursor={true}
                    >
                        {info.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="slide-content">
                                    <h3 className="slide-year">{item.year}</h3>
                                    <div className="slide-description">{item.description}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="navigation-buttons-right">
                    {!showLeftButton && (
                        <button className="next-button-right" aria-label="Next slide" onClick={handleNextClick}>
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                                <path d="M1 1L6 6L1 11" stroke="#42567A" strokeWidth="2"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Slider;