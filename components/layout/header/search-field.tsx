import { Search } from "lucide-react";
import React from "react";
import { Input } from "../../ui/input";

const SearchField = () => {
  return (
    <div className="relative hidden sm:block">
      <Search className="absolute top-2.5 left-4 w-4 text-muted-foreground h-4" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10 bg-primary/10"
        aria-label="Search"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchField;
