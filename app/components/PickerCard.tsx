"use client";
import { Card, Divider, Group, Stack, Text } from "@mantine/core";

import { ButtonWithCopy } from "./ButtonWithCopy";
import { CategoryDropdown } from "./CategoryDropdown";
import { TaxonomyChildren, TaxonomyNode } from "@/types/TaxonomyNode.type";
import { useState } from "react";

export function PickerCard({ categories }: { categories: TaxonomyChildren }) {
  const [selected, setSelected] = useState<string[]>([]);

  const selectedItem = selected
    .slice(1)
    .reduce((acc, name) => acc?.children?.[name], categories[selected[0]] as TaxonomyNode | undefined);

  const selectedCategory = selected.join(" > ");

  return (
    <Card
      radius="lg"
      w="100%"
      maw="450px"
      p="lg"
      style={{
        boxShadow: "5px 5px 10px 0 rgba(194,92,130,0.3),-5px -5px 20px 0 rgba(255,188,166,0.3)",
      }}
    >
      <Stack>
        <CategoryDropdown categories={categories} onOptionSubmit={(value) => setSelected([value])} />

        {selected.map((value, idx) => {
          let options = selected.reduce(
            (prev, option, i) => (i <= idx ? prev[option].children || {} : prev),
            categories
          );

          if (Object.keys(options).length === 0) return;

          return (
            <CategoryDropdown
              key={value}
              categories={options}
              onOptionSubmit={(value) => setSelected([...selected.splice(0, idx + 1), value])}
            />
          );
        })}

        <Divider />
        <Text>{selectedCategory}</Text>
        <Group grow>
          <ButtonWithCopy
            label={`Copy ID${selectedItem?.id ? `: ${selectedItem.id}` : ""}`}
            valueToCopy={selectedItem?.id}
            disabled={!selectedItem}
          />

          <ButtonWithCopy label="Copy name" valueToCopy={selectedCategory} disabled={!selectedCategory} />
        </Group>
      </Stack>
    </Card>
  );
}
