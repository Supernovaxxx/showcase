export interface Certificate {
        title: string,
        issuerName: string,
        issuerLogo: string,
        date: string, // TODO: define date type (mm/dd/aaaa | mm/aaaa)
        skills: string[],
        url: string
}

export interface CertificatesProps {
        certificates: Certificate[]
}
