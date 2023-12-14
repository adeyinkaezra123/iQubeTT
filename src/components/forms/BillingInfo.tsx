"use client"

import * as z from 'zod';
import { useMemo } from 'react';
import AutoForm, { AutoFormSubmit } from '../wrappers/autoform';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { Input } from '../ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import statesAndLga from '@/utils/statesAndLga';

type FormProps = {
    handleSubmit: () => void,
    className?: string
}

const formSchema = z.object({

    nameOnCard: z.string({ required_error: "Please enter your name ast it is written in your card." }).min(5, {
        message: "Please your name must be at least 5 characters.",
    }).default(''),

    cardType: z.enum(["Visa", 'Mastercard']),

    cardDetails: z.string().max(16),

    expiryDate: z.coerce.date(new Date().toString()),
    invitedGuests: z
        .array(
            // Define the fields for each item
            z.object({
                name: z.string(),
                age: z.coerce.number(),
            }),
        ),

});


export default function BillingInfo({ handleSubmit, className }: FormProps) {
    const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});

    return (
        <AutoForm
            onSubmit={(e) => handleSubmit()}
            // Pass the schema to the form
            formSchema={formSchema}
            // You can add additional config for each field
            // to customize the UI
            fieldConfig={{
                nameOnCard: {
                    inputProps: {
                        placeholder: "Elon Musk"
                    }
                },
            }}
        >
            <div className="flex space-x-4 items-center">
                <AutoFormSubmit size='lg'>Next</AutoFormSubmit>
                <Button variant='ghost' className='text-[#4E598C] text-md font-medium' >Cancel Payment</Button>
            </div>
        </AutoForm>
    )
}