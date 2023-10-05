export function Favicon({domain}: {domain: string}) {
    return(
        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=24`} className='inline' />
    )
}
