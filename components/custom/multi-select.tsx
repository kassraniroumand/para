"use client"

import * as React from "react"
import {X, Check, ChevronsUpDown, PlusCircle, Search} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"

export interface SelectItem {
    value: string
    label: string
}

interface MultiSelectProps {
    items: {
        value: number
        label: string
    }[]
    isLoading?: boolean
    select: string[]
    onSelect: (value: string[]) => void
    onCreate?: (value: string) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
                                items,
                                select,
                                isLoading = false,
                                onSelect,
                                onCreate,
                                placeholder = "Select options",
                                className,
                            }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [newItemValue, setNewItemValue] = React.useState("")
    const [dialogOpen, setDialogOpen] = React.useState(false)

    // Filter items based on search
    const filteredItems = React.useMemo(() => {
        return items.filter(
            (item) =>
                item.label.toLowerCase().includes(searchValue.toLowerCase())
        )
    }, [items, searchValue])

    const handleSelect = (value: string) => {
        if (select.includes(value)) {
            onSelect(select.filter((item) => item !== value))
        } else {
            onSelect([...select, value])
        }
    }

    const handleRemove = (valueToRemove: string) => {
        onSelect(select.filter((value) => value !== valueToRemove))
    }

    const handleCreateItem = () => {
        if (newItemValue && onCreate) {
            onCreate(newItemValue)
            setNewItemValue("")
            setDialogOpen(false)
        }
    }

    // Get labels for selected values
    const getLabel = (value: string) => {
        const item = items.find((item) => String(item.value) === value)
        return item ? item.label : value
    }

    return (

                <div className={`space-y-2 ${className}`}>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {select.map((value) => (
                            <Badge key={value} variant="secondary">
                                {getLabel(value)}
                                <Button type={"button"} variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1"
                                        onClick={() => handleRemove(value)}>
                                    <X className="h-3 w-3"/>
                                </Button>
                            </Badge>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger>
                                <Button type={"button"} variant="outline" role="combobox" aria-expanded={open}
                                        className="w-full justify-between">
                                    {select.length > 0 ? `${select.length} selected` : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0" align="start">
                                <div className="p-2">
                                    <div className="flex items-center border rounded-md px-3 py-1">
                                        <Search className="h-4 w-4 mr-2 opacity-50"/>
                                        <Input
                                            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="Search..."
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="max-h-[200px] overflow-y-auto">
                                    {isLoading ? (
                                        <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                            loading
                                        </div>
                                        ) : (
                                        <>
                                            {filteredItems.length > 0 ? (
                                                filteredItems.map((item) => (
                                                    <div
                                                        key={item.value}
                                                        className={cn(
                                                            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                                            select.includes(String(item.value)) && "bg-accent text-accent-foreground",
                                                        )}
                                                        onClick={() => handleSelect(String(item.value))}
                                                    >
                                                        <Check
                                                            className={cn("mr-2 h-4 w-4", select.includes(String(item.value)) ? "opacity-100" : "opacity-0")}/>
                                                        {item.label}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                                                    No results found
                                                    {onCreate && searchValue && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2 w-full"
                                                            onClick={() => {
                                                                setDialogOpen(true)
                                                                setNewItemValue(searchValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <PlusCircle className="mr-2 h-4 w-4"/>
                                                            Create "{searchValue}"
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                </div>
                            </PopoverContent>
                        </Popover>

                        {onCreate && (
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button type={"button"} variant="outline" size="icon">
                                        <PlusCircle className="h-4 w-4"/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add new item</DialogTitle>
                                    </DialogHeader>
                                    <Input
                                        value={newItemValue}
                                        onChange={(e) => setNewItemValue(e.target.value)}
                                        placeholder="Enter new item"
                                        className="mt-2"
                                    />
                                    <DialogFooter className="mt-4">
                                        <Button type={"button"} onClick={handleCreateItem} disabled={!newItemValue}>
                                            Add
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>


    )
}
