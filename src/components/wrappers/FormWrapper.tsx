import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ZodObjectOrWrapped } from './autoform/utils';

type FormWrapperProps<T> = {
    onSubmit: () => void,
    children: React.ReactNode,
    className?: string
    formSchema: T
}

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    })
})

export default function FormWrapper<SchemaType extends ZodObjectOrWrapped>({ formSchema, onSubmit: onSubmitProp, children }: FormWrapperProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function handleSubmit(values: z.infer<typeof formSchema>) {
        const parsedValues = formSchema.safeParse(values);
        if (parsedValues.success) {
            onSubmitProp?.(parsedValues.data);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={(e) => form.handleSubmit(handleSubmit)(e)} className={cn("space-y-5")}>
                <FormField control={form.control}>
                    {children}
                </FormField>
            </form>
            <Button type="submit">Submit</Button>
        </Form>
    )
}