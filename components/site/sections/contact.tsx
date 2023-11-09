'use client'

import { motion } from 'framer-motion'

import ContactForm from '@/components/core/contact-form'


export function ContactSection() {
    
    return (
        <div className='flex flex-col justify-center items-center gap-2 p-8 w-100'>
            <h2 className='text-3xl font-bold text-foreground'>
                Contact form
            </h2>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            >
                <ContactForm />
            </motion.div>
        </div>
    )
}
