import { useState, useEffect } from 'react';

function consumeWindowProperties() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height
    }
}

export function useWindowProperties() {
    const [windowProperties, setWindowProperties] = useState(consumeWindowProperties());

    useEffect(() => {
        function handleUpdate() {
            setWindowProperties(consumeWindowProperties());
        }

        // Set up all event listeners
        window.addEventListener('resize', handleUpdate)

        // Remove all event listeners on cleanup
        return () => {
            window.removeEventListener('resize', handleUpdate)
        }
    }, []);

    return windowProperties;
}
