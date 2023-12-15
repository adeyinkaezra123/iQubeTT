"use client";

import * as z from "zod";
import { forwardRef, useMemo } from "react";
import AutoForm, { AutoFormSubmit } from "../wrappers/autoform";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { DatePicker } from "../ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { useForm } from "react-hook-form";

type Props = {
  handleSubmit: (data: any) => void;
  className?: string;
};
type Ref = HTMLButtonElement;

const BillingInfo = forwardRef<Ref, Props>(function BillingInfo(props, ref) {
  const { handleSubmit, className } = props;

  const formSchema = z.object({
    nameOnCard: z
      .string({
        required_error:
          "Please enter your name ast it is written in your card.",
      })
      .min(5, {
        message: "Please your name must be at least 5 characters.",
      }),
    cardType: z.enum(["visa", "mastercard"]),

    cardDetails: z
      .string({ required_error: "This field is required." })
      .max(16),
    cvv: z.string({ required_error: "This field is required." }).max(3),

    expiryDate: z.coerce.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const watchCardDetails = form.watch("cardDetails", "");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleSubmit([
            !Object.keys(form.formState.errors).length,
            form.getValues(),
          ])
        )}
        className="space-y-8 max-w-3/4"
      >
        <FormField
          control={form.control}
          name="nameOnCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <span className="text-destructive"> *</span>
              <FormControl>
                <Input placeholder="Elon Musk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardType"
          render={({ field }) => (
            <FormItem className="flex-2">
              <FormLabel>Card Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Select a card type"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-8 w-full">
          <FormField
            control={form.control}
            name="cardDetails"
            render={({ field }) => (
              <FormItem className="flex-[3]">
                <FormLabel>Card Details</FormLabel>
                <span className="text-destructive"> *</span>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="  1234         1234         1234         1234  "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormLabel>Expiry date</FormLabel>
                <span className="text-destructive">*</span>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Card Details</FormLabel>
                <span className="text-destructive">*</span>
                <FormControl>
                  <Input type="number" placeholder="419" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="hidden" type="submit" ref={ref}>
          Submit
        </Button>
      </form>
    </Form>
  );
});

export default BillingInfo;
