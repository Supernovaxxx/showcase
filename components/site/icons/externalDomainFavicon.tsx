export function ExternalDomainFavicon({ domain, size=24 }: { domain: string, size?: number }) {
    return (
        <img
            src={
                `https://www.google.com/s2/favicons?` +
                `domain=${domain}&` +
                `sz=${size}`
            }
            className='inline'
        />
    )
}
