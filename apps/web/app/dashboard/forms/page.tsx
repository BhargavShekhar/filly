"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { CreateFormDialog } from "~/components/create-form-dialog"
import { useListForms } from "~/hooks/api/form"

export default function FormPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { forms, isLoading } = useListForms()

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Forms</h1>
          <p className="text-muted-foreground mt-2">Create and manage your forms here.</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Create New Form
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading forms...</p>
        </div>
      ) : forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No forms yet. Create your first form to get started.</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Create First Form
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/forms/${form.id}`} className="hover:underline">
                      {form.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {form.description || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {form.createdAt
                      ? new Date(form.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/forms/${form.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CreateFormDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}
