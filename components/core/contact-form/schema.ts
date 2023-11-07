import * as z from "zod"

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Your name must have at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email!",
    }),
    message: z.string()
        .min(10, {
            message: "Your message needs to be at least 10 characters long. Tell me more!",
        })
        .max(500, {
            message: "Your message can have up to 500 characters.",
        }),
    newsletter: z.boolean()
})

export type FormSchema = z.infer<typeof formSchema>
