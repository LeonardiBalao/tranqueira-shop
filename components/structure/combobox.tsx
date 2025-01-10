"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface ComboboxProps {
  allReviews: ReviewWithPriceAndRatingAsString[];
}

export function Combobox({ allReviews }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleProduct = async (review: ReviewWithPriceAndRatingAsString) => {
    return window.open(review.affiliateLink, "_blank");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[90%] md:w-[500px] mx-auto my-4"
        >
          {value
            ? allReviews.find(
                (review: ReviewWithPriceAndRatingAsString) =>
                  review.name === value
              )?.name
            : "Procure o produto..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90%] mx-auto flex md:w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Procure o produto..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
            <CommandGroup>
              {allReviews.map((review: ReviewWithPriceAndRatingAsString) => (
                <CommandItem
                  key={review.id}
                  value={review.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    handleProduct(review);
                  }}
                >
                  {review.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === review.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
