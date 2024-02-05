"use client"

import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type FormSchema = {
  name: string
  description: string
}

export default function ChannelForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormSchema>({
    defaultValues: { name: "", description: "" }
  })

  async function onSubmit(values: FormSchema) {
    try {
      const request = await axios.post("/api/channels", values)

      router.push(`/channels/${request.data.id}`)

      toast({
        title: "Horay!",
        description: `Room ${values.name} successfully created`
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        const errors = e.response?.data.errors
        errors.map((e: any) => form.setError(e.field, { message: e.message }))
      }
    }
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
