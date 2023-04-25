import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface CarouselProps {
    children: React.ReactNode[];
}

export function Carousel({ children }: CarouselProps) {
    const [active, setActive] = useState(0);
    const count = React.Children.count(children);

    const handlePrev = () => {
        setActive(active === 0 ? count - 1 : active - 1);
    };

    const handleNext = () => {
        setActive(active === count - 1 ? 0 : active + 1);
    };

    return (
        <div
            className="carousel"
            style={{ position: 'relative', width: '100%' }}
        >
            <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={handlePrev}
                size="lg"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '20px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                }}
            />
            <FontAwesomeIcon
                icon={faChevronRight}
                onClick={handleNext}
                size="lg"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '20px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                }}
            />
            {React.Children.map(children, (child, i) => (
                <div style={{ display: active === i ? 'block' : 'none' }}>
                    {child}
                </div>
            ))}
        </div>
    );
}
