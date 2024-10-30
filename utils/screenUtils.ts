// utils/screenUtils.ts
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useResponsiveColumns = () => {
    const calculateColumnsAndWidth = () => {
        const screenWidth = Dimensions.get('window').width;
        let numColumns = 1;
        let cardMaxWidth = 300; // Define a max width for cards on larger screens

        if (screenWidth > 1400) {
            numColumns = 4;
        } else if (screenWidth > 1000) {
            numColumns = 3;
        } else if (screenWidth > 600) {
            numColumns = 2;
        }

        // Calculate card max width to keep consistent size
        cardMaxWidth = screenWidth / numColumns - 20; // Adjust margin between cards

        return { numColumns, cardMaxWidth };
    };

    const [layout, setLayout] = useState(calculateColumnsAndWidth);

    useEffect(() => {
        const updateLayout = () => setLayout(calculateColumnsAndWidth());
        const subscription = Dimensions.addEventListener('change', updateLayout);

        return () => subscription?.remove();
    }, []);

    return layout;
};
