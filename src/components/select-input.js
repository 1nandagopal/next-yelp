"use client";

import { Select, SelectItem } from "@nextui-org/react";

export function SelectInput({ items, name, ...props }) {
  if (!items) return;

  return (
    <Select items={items} name={name} {...props}>
      {items.map((item) => (
        <SelectItem key={item} textValue={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}
