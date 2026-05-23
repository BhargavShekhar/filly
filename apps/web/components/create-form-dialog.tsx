"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { useCreateForm } from "~/hooks/api/form"

const createFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(55, "Title must be less than 55 characters"),
  description: z.string().max(255, "Description must be less than 255 characters").optional(),
})

type CreateFormValues = z.infer<typeof createFormSchema>

interface CreateFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateFormDialog({ open, onOpenChange }: CreateFormDialogProps) {
  const { createFormAsync, isPending } = useCreateForm()
  
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit = async (data: CreateFormValues) => {
    try {
      await createFormAsync(data)
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating form:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                placeholder="Enter form title"
                {...form.register("title")}
                disabled={isPending}
              />
              {form.formState.errors.title && (
                <FieldDescription className="text-red-500">
                  {form.formState.errors.title.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Enter form description (optional)"
                {...form.register("description")}
                disabled={isPending}
              />
              {form.formState.errors.description && (
                <FieldDescription className="text-red-500">
                  {form.formState.errors.description.message}
                </FieldDescription>
              )}
            </Field>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Form"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
