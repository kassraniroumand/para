"use client"

import * as React from "react"
import { X, Check, ChevronsUpDown, Plus } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface Category {
    id: number
    name: string
}

interface CreatableCategoryMultiSelectProps {
    categories: Category[]
    selected: number[]
    onChange: (selected: number[]) => void
    onCreateCategory?: (name: string) => void
    onAddCategory?: (category: Category) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export function CreatableCategoryMultiSelect({
                                                 categories: initialCategories,
                                                 selected,
                                                 onChange,
                                                 onCreateCategory,
                                                 onAddCategory,
                                                 placeholder = "Select categories",
                                                 className,
                                                 disabled = false,
                                                 ...props
                                             }: CreatableCategoryMultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const [categories, setCategories] = React.useState<Category[]>(initialCategories)

    // Update categories when initialCategories change
    React.useEffect(() => {
        setCategories(initialCategories)
    }, [initialCategories])

    const handleUnselect = (id: number) => {
        onChange(selected.filter((i) => i !== id))
    }

    const handleSelect = (value: string) => {
        if (value.startsWith("create:")) {
            const newName = value.replace("create:", "")

            if (newName.trim() === "") return

            // Check if the category already exists
            const exists = categories.some(
                (category) => category.name.toLowerCase() === newName.toLowerCase()
            )

            if (!exists) {
                // Generate a new ID (in a real app, this would come from the backend)
                const newId = Math.max(0, ...categories.map(c => c.id)) + 1
                const newCategory = { id: newId, name: newName }

                setCategories((prev) => [...prev, newCategory])

                if (onCreateCategory) {
                    onCreateCategory(newName)
                }

                if (onAddCategory) {
                    onAddCategory(newCategory)
                }

                onChange([...selected, newId])
                setInputValue("")
            }
        } else {
            // Regular selection - find the category by name and get its ID
            const category = categories.find(c => c.name === value)
            if (category) {
                if (selected.includes(category.id)) {
                    onChange(selected.filter((id) => id !== category.id))
                } else {
                    onChange([...selected, category.id])
                }
            }
        }

        // Keep the popover open after selection
        setTimeout(() => {
            const input = document.querySelector("[cmdk-input]") as HTMLInputElement
            if (input) input.focus()
        }, 0)
    }

    // Filter categories based on input value
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
    )

    // Determine if we should show the create option
    const showCreateOption =
        inputValue.trim() !== "" &&
        !filteredCategories.some((category) => category.name.toLowerCase() === inputValue.toLowerCase())

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("min-h-10 h-auto w-full justify-between", className)}
                    onClick={() => setOpen(!open)}
                    disabled={disabled}
                    {...props}
                >
                    <div className="flex flex-wrap gap-1">
                        {selected.length > 0 ? (
                            selected.map((id) => {
                                const category = categories.find((c) => c.id === id)
                                return (
                                    <Badge
                                        key={id}
                                        variant="secondary"
                                        className="mr-1 mb-1"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleUnselect(id)
                                        }}
                                    >
                                        {category?.name || `ID: ${id}`}
                                        <button
                                            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleUnselect(id)
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleUnselect(id)
                                            }}
                                        >
                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                        </button>
                                    </Badge>
                                )
                            })
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput placeholder="Search or create..." value={inputValue} onValueChange={setInputValue} />
                    <CommandList>
                        {filteredCategories.length === 0 && !showCreateOption && <CommandEmpty>No results found.</CommandEmpty>}
                        <CommandGroup>
                            {filteredCategories.map((category) => {
                                const isSelected = selected.includes(category.id)
                                return (
                                    <CommandItem
                                        key={category.id}
                                        value={category.name}
                                        onSelect={() => handleSelect(category.name)}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                                            )}
                                        >
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span>{category.name}</span>
                                    </CommandItem>
                                )
                            })}
                            {showCreateOption && (
                                <CommandItem
                                    value={`create:${inputValue}`}
                                    className="text-emerald-600"
                                    onSelect={() => handleSelect(`create:${inputValue}`)}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create "{inputValue}"
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
