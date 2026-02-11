"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormState = {
    name: string
    label: string
    synopsis: string
    description: string
    version: string
    authors: string
    license: string
    repository: string
    platforms: string
    checksum: string
}

const initialState: FormState = {
    name: "",
    label: "",
    synopsis: "",
    description: "",
    version: "",
    authors: "",
    license: "",
    repository: "",
    platforms: "",
    checksum: "",
}

/**
 * Render the Armory submission form.
 */
export default function Add() {
    const router = useRouter()
    const [form, setForm] = useState<FormState>(initialState)
    const [status, setStatus] = useState<"idle" | "saving" | "error">("idle")
    const [error, setError] = useState<string | null>(null)

    const updateField = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus("saving")
        setError(null)

        try {
            const response = await fetch("/api/pending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            if (!response.ok) {
                const result = (await response.json()) as { error?: string }
                throw new Error(result?.error ?? "Failed to submit shuriken")
            }

            setStatus("idle")
            router.push("/armory")
        } catch (err) {
            setStatus("error")
            setError(err instanceof Error ? err.message : "Failed to submit shuriken")
        }
    }

    return (
        <div className="w-full flex justify-center p-6">
            <div className="w-full max-w-3xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Submit a Shuriken</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Provide the details below to publish a shuriken to the Armory.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Submissions are reviewed by admins before they appear in the Armory.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                required
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="e.g. Apache"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Label</label>
                            <Input
                                required
                                value={form.label}
                                onChange={(e) => updateField("label", e.target.value)}
                                placeholder="e.g. Server"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Synopsis</label>
                        <Input
                            required
                            value={form.synopsis}
                            onChange={(e) => updateField("synopsis", e.target.value)}
                            placeholder="Short summary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            required
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Detailed description"
                            className="min-h-30 w-full rounded-md border border-border/40 bg-background/70 p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Version</label>
                            <Input
                                required
                                value={form.version}
                                onChange={(e) => updateField("version", e.target.value)}
                                placeholder="e.g. 1.0.0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Authors</label>
                            <Input
                                required
                                value={form.authors}
                                onChange={(e) => updateField("authors", e.target.value)}
                                placeholder="e.g. Ninja Team"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">License</label>
                            <Input
                                required
                                value={form.license}
                                onChange={(e) => updateField("license", e.target.value)}
                                placeholder="e.g. MIT"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Repository</label>
                            <Input
                                required
                                value={form.repository}
                                onChange={(e) => updateField("repository", e.target.value)}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Platforms</label>
                            <Input
                                required
                                value={form.platforms}
                                onChange={(e) => updateField("platforms", e.target.value)}
                                placeholder="e.g. linux, macos"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Checksum</label>
                            <Input
                                required
                                value={form.checksum}
                                onChange={(e) => updateField("checksum", e.target.value)}
                                placeholder="SHA256"
                            />
                        </div>
                    </div>

                    {status === "error" && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={status === "saving"}>
                            {status === "saving" ? "Submitting..." : "Submit shuriken"}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.push("/armory")}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}