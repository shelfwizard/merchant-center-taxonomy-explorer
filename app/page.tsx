"use client";
import {
  Anchor,
  AutocompleteProps,
  Box,
  Button,
  Card,
  Center,
  Group,
  rem,
  Select,
  SelectProps,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { categories } from "./categories";
import { TaxonomyChildren } from "@/types/TaxonomyNode.type";
import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";

function CategoryDropdown({
  categories,
  label,
  onOptionSubmit,
}: {
  label: string;
  categories: TaxonomyChildren;
  onOptionSubmit: AutocompleteProps["onOptionSubmit"];
}) {
  const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => {
    //@ts-ignore
    const childrenCount = option.childrenCount;
    return (
      <Group flex="1" gap="xs">
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
      label={label}
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

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <main>
      <Stack h="100vh" justify="center" align="center" pos="relative" gap="xl">
        <Title c="gray.8">Merchant Center Taxonomy Explorer</Title>

        <Card radius="lg" withBorder shadow="md" w="450px" p="lg">
          <Stack>
            <CategoryDropdown
              categories={categories}
              label="Category"
              onOptionSubmit={(value) => setSelected([value])}
            />

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
                  label={`Subcategory #${idx + 1}`}
                  onOptionSubmit={(value) => setSelected([...selected.splice(0, idx + 1), value])}
                />
              );
            })}

            <Group>
              <Button radius="lg">Copy ID</Button>
              <Button radius="lg">Copy Name</Button>
            </Group>
          </Stack>
        </Card>

        <Box w="100%" pos="absolute" bottom={0}>
          <Center mb="xl">
            <Stack px="xl" maw="1000px">
              <Title order={3}>What is this tool?</Title>
              <Text>
                Including <code>google_product_category</code> in your Google Shopping feed is important because it
                helps Google accurately categorize your products, improving their visibility in relevant searches.
                Proper categorization enhances ad targeting, boosts click-through rates, and ensures compliance with
                Google’s policies.
              </Text>
            </Stack>
          </Center>
          <Box bg="primary" p="sm" px="xl">
            <Text c="white">
              Made with ♥ by{" "}
              <Anchor c="white" fw={600} href="https://shelfwizard.com" target="_blank">
                Shelf Wizard
              </Anchor>
            </Text>
          </Box>
        </Box>
      </Stack>
    </main>
  );
}
