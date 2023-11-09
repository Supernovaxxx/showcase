import { CertificatesPanel } from '@/components/core/certificates'


export function CertificationSection() {
    return (
        <section className='flex flex-col justify-center items-center p-8 w-100'>
            <h2 className='text-3xl font-bold text-slate-800'>
                Certificates
            </h2>
            <CertificatesPanel />
        </section>
    )
}
