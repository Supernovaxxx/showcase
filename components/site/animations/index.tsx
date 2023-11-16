import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

interface GroupHorizontalLoopProps extends React.PropsWithChildren {
    initial?: string
    direction?: string
}


export function HorizontalInfiniteLoop({
    children,
    initial = '0',
    direction = '-50%'
}: GroupHorizontalLoopProps) {

    const controls = useAnimation()

    useEffect(() => {
        startRotation()
    }, [])

    function startRotation() {
        controls.start({ x: direction, transition: { duration: 40, repeat: Infinity, repeatType: 'loop', ease: 'linear', velocity: 1 } })
    }
    function stopRotation() {
        controls.stop()
    }

    return (
        <div className='relative h-36 flex items-end mb-4'>
            <motion.div
                initial={{ x: initial }}
                animate={controls}
                className='absolute flex'
                onHoverStart={stopRotation}
                onHoverEnd={startRotation}
            >
                {children}
            </motion.div>
        </div>
    )
}

export function HoverMotion({ children }: { children: React.ReactNode }) {

    return (
        <motion.div
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.2, opacity: 1, transition: { duration: 0.5 } }}
        >
            {children}
        </motion.div>
    )
}
