"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
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

export function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "", 
            newsletter: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2 p-8 w-100">
            <h2 className='text-3xl font-bold text-slate-800'>
                Contact form
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 my-4">
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="youremail@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className="resize-none" />
                                </FormControl>
                                <FormDescription>
                                    Write me about anything!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='newsletter'
                        rules={{ 
                            required: true,
                            validate: (value) => value === true || "Please agree to receive the newsletter via e-mail.",
                        }}
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-center gap-1">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>
                                    Agree to receive newsletter via e-mail.
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
