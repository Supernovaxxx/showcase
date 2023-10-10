'use client'
import { useState, useEffect } from 'react';


interface WindowProperties {
    width: number
    height: number
}

const DEFAULT_WINDOW_PROPERTIES: WindowProperties = {
    width: 0,
    height: 0
}

function consumeWindowProperties(): WindowProperties {
    if (typeof window === 'undefined') return DEFAULT_WINDOW_PROPERTIES

    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height
    }
}

export function useWindowProperties() {
    // Serve global window properties as an constantly updated react state.

    const [windowProperties, setWindowProperties] = useState<WindowProperties>(consumeWindowProperties());

    useWindowEventListener('resize',
        () => {
            const windowProperties = consumeWindowProperties()
            if (windowProperties)
                setWindowProperties(windowProperties);
        }
    )

    return windowProperties;
}

export function useWindowEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any) {
    // Abstract listener registration and unregistration behavior
    // on component mount and unmount for window events.

    useEffect(() => {
        window.addEventListener(type, listener)

        return () => {
            window.removeEventListener(type, listener)
        }
    }, [])
}