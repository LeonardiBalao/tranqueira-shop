"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={`items-center flex justify-center ${className} w-[240px]`}>
      <Input
        type="text"
        placeholder="Pesquisar reviews"
        className="w-full border border-gray-300 rounded-lg px-8"
      />
      <Search className="-ml-8" color="gray" />
    </div>
  );
}
