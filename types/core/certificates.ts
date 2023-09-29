export interface Certificate {
        title: string,
        date: string, // TODO: define date type (mm/dd/aaaa | mm/aaaa)
        skills: string[],
        issuer: {
                title: string,
                logo: string
        },
        imageUrl: string,
        certificateUrl: string
}
