import ContactForm from "@/components/core/contact-form"


export function ContactSection() {
    
    return (
        <div className="flex flex-col justify-center items-center gap-2 p-8 w-100">
            <h2 className='text-3xl font-bold text-foreground'>
                Contact form
            </h2>
           <ContactForm />
        </div>
    )
}
