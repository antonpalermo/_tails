"use client"

import axios from "axios"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form"

import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  name: z.string(),
  description: z.string()
})

export default function ChannelForm() {
  const defaultValues: z.infer<typeof schema> = {
    name: "",
    description: ""
  }

  const form = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    const response = await axios.post("/api/channels", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My channel" {...field} />
              </FormControl>
              <FormDescription>Desired channel name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
