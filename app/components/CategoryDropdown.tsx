import { AutocompleteProps, Group, Select, SelectProps, Text } from "@mantine/core";

import { TaxonomyChildren } from "@/types/TaxonomyNode.type";
import { IconCheck } from "@tabler/icons-react";

export function CategoryDropdown({
  categories,

  onOptionSubmit,
}: {
  categories: TaxonomyChildren;
  onOptionSubmit: AutocompleteProps["onOptionSubmit"];
}) {
  const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => {
    //@ts-ignore
    const childrenCount = option.childrenCount;
    return (
      <Group flex="1" gap="xs" wrap="wrap" justify="end">
        {checked && <IconCheck color="grey" />}

        <Text style={{ flexGrow: 1 }}>{option.label}</Text>

        <Text size="sm" c="dimmed">
          ({childrenCount} children)
        </Text>
      </Group>
    );
  };

  return (
    <Select
      // label={label}
      radius="lg"
      size="md"
      placeholder="Pick a value"
      data={Object.entries(categories).map(([name, node]) => ({
        label: name,
        value: name,
        childrenCount: Object.keys(node.children || {}).length,
      }))}
      onOptionSubmit={onOptionSubmit}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      renderOption={renderSelectOption}
    />
  );
}
