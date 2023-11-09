'use client'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { resolver, Schema } from './schema'


export default function ContactForm() {
    const form = useForm<Schema>({
        resolver: resolver,
        defaultValues: {
            name: '',
            email: '',
            message: '',
            newsletter: undefined,
        },
    })

    function onSubmit(values: Schema) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 my-4'>
                <FormField
                    control={form.control}
                    name='name'
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
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='youremail@email.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea {...field} className='resize-none' />
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
                        validate: (value) => value === true || 'Please agree to receive the newsletter via e-mail.',
                    }}
                    render={({ field }) => (
                        <FormItem className='flex items-center justify-center gap-1'>
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
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}
