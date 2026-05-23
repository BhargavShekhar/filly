"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "~/components/ui/button"
export default function FormBuilderPage() {
    const params = useParams()
    const formId = params.id as string

    return (
        <div className="px-4 lg:px-6 space-y-6">
            <h1 className="text-2xl font-bold">FILLY</h1>
            <div className="flex items-center gap-4">
                <Link href="/dashboard/forms">
                    <Button variant="outline" size="sm">
                        ← Back to Forms
                    </Button>
                </Link>
            </div>
            <div>
                <h5 className="text-gray-100/90">Form ID: {formId}</h5>
            </div>
        </div>
    )
}
