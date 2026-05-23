"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { CreateFormDialog } from "~/components/create-form-dialog"

export default function FormPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Forms</h1>
          <p className="text-muted-foreground mt-2">Create and manage your forms here.</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Create New Form
        </Button>
      </div>

      <CreateFormDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}