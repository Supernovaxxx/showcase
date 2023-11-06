'use server'
import { Schema } from "./schema"


export async function SendContactForm(data: Schema) {
    console.log(data)
    return "Thanks for the message!"
}
