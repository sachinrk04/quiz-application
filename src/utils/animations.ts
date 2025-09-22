// Animation utilities for smooth transitions

export const fadeIn = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    transition: {duration: 0.3},
};

export const slideInFromLeft = {
    initial: {opacity: 0, x: -50},
    animate: {opacity: 1, x: 0},
    transition: {duration: 0.3, ease: "easeOut"},
};

export const slideInFromRight = {
    initial: {opacity: 0, x: 50},
    animate: {opacity: 1, x: 0},
    transition: {duration: 0.3, ease: "easeOut"},
};

export const slideInFromBottom = {
    initial: {opacity: 0, y: 50},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.3, ease: "easeOut"},
};

export const scaleIn = {
    initial: {opacity: 0, scale: 0.9},
    animate: {opacity: 1, scale: 1},
    transition: {duration: 0.2, ease: "easeOut"},
};

export const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};
