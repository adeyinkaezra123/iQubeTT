"use client";

import * as z from "zod";
import { forwardRef, useMemo } from "react";

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
import statesAndLga from "@/utils/statesAndLga";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "../ui/select";

const nigerianStates = statesAndLga.map((entry) => entry.state);
type Ref = HTMLButtonElement;

type Props = {
  handleSubmit: (data: any) => void;
  className?: string;
};

const PersonalInfo = forwardRef<Ref, Props>(function PersonalInfo(props, ref) {
  const { handleSubmit, className } = props;

  const formSchema = z.object({
    fullName: z
      .string({ required_error: "Full name is required." })
      .min(5, {
        message: "Full name must be at least 5 characters.",
      })
      .default(""),

    emailAddress: z
      .string({
        required_error: "Please provide a valid email address",
      })
      .email("This email is invalid."),

    address1: z
      .string()
      .min(5, {
        message: "Please enter a valid address",
      })
      .max(100)
      .describe("Address 1")
      .optional(),

    address2: z
      .string()
      .min(5, {
        message: "Please enter a valid address",
      })
      .max(100)
      .describe("Address 2")
      .optional(),

    lga: z.string(),
    state: z.string({ required_error: "This field is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const watchState = form.watch("state", "");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          handleSubmit([!Object.keys(form.formState.errors).length, form.getValues()])
        )}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="fullName"
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
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <span className="text-destructive"> *</span>
              <FormControl>
                <Input placeholder="elon@musk.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="Street No., Street Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="City, State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8 w-full">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a State" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {nigerianStates.map((value) => (
                        <SelectItem value={value} key={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lga"
            render={({ field }) => (
              <FormItem className="flex-2">
                <FormLabel>Local Government Area</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={!watchState}>
                      <SelectValue placeholder={"Select a LGA"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {watchState &&
                        statesAndLga
                          .filter((state) => state.state == watchState)[0]
                          .lgas.map((value, index) => (
                            <SelectItem value={value} key={value + index}>
                              {value}
                            </SelectItem>
                          ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

export default PersonalInfo;
