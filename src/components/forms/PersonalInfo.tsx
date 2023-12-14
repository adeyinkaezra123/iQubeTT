"use client"

import * as z from 'zod';
import { useMemo } from 'react';
import AutoForm, { AutoFormSubmit } from '../wrappers/autoform';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { Input } from '../ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import statesAndLga from '@/utils/statesAndLga';

const nigerianStates = statesAndLga.map((entry) => entry.state)
type FormProps = {
  handleSubmit: () => void,
  className?: string
}

const formSchema = z.object({

  fullName: z.string({ required_error: "Full name is required." }).min(5, {
    message: "Full name must be at least 5 characters.",
  }).default(''),

  emailAddress: z.string({
    required_error: "Please provide a valid email address"
  }).email("This email is invalid."),


  address: z.object({
    address1: z.string().min(5, {
      message: 'Please enter a valid address'
    }).max(100).describe('Address 1').optional(),

    address2: z.string().min(5, {
      message: 'Please enter a valid address'
    }).max(100).describe('Address 2').optional(),
  }),


  // Enum will show a select

  stateAndLga: z.object({
    state: z.enum([' ', ...nigerianStates]),
    lga: z.enum([" "]),
  }),

});


export default function PersonalInfo({ handleSubmit, className }: FormProps) {
  const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});

  return (
    <AutoForm
      onSubmit={(e) => handleSubmit()}
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        fullName: {
          inputProps: {
            placeholder: "Elon Musk"
          }
        },
        emailAddress: {
          description: "The purchase reciept would be sent to this address",
          inputProps: {
            type: "email",
            placeholder: "elon@musk.com",
          },
        },

      }}
    >
      {/* <div className="flex space-x-4 items-center">

        <FormField
          // control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant='ghost' className='text-[#4E598C] text-md font-medium' >Cancel Payment</Button>
      </div> */}

      <div className="flex space-x-4 items-center">
        <AutoFormSubmit size='lg'>Next</AutoFormSubmit>
        <Button variant='ghost' className='text-[#4E598C] text-md font-medium' >Cancel Payment</Button>
      </div>
    </AutoForm>
  )
}