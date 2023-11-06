'use server'
import { FormSchema } from "./schema"


export async function SendContactForm(data: FormSchema) {
    console.log(data)
    return "Thanks for the message!"
}
