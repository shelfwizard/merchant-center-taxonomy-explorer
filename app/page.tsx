import { Anchor, Box, Center, Stack, Text, Title } from "@mantine/core";
import { TaxonomyChildren, type TaxonomyNode } from "@/types/TaxonomyNode.type";
import { PickerCard } from "./components/PickerCard";

const TAXONOMY_URL = "https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt";

async function getTaxonomy(): Promise<TaxonomyChildren> {
  const result = await fetch(TAXONOMY_URL).then((r) => r.text());

  const categories: { [key: string]: TaxonomyNode } = {};

  for (const row of result.split("\n")) {
    // skip comments
    if (!row || row.trim().startsWith("#")) continue;

    const [id, fullName] = row.split(" - ");

    const nameSegments = fullName.split(">").map((segment) => segment.trim());

    let target: TaxonomyNode | null = null;
    for (const segment of nameSegments) {
      if (!target) {
        categories[segment] ??= {};
        target = categories[segment];
      } else {
        if (!target.children) target.children = {};
        target.children[segment] ??= {};
        target = target.children[segment];
      }
    }

    if (target) target.id = Number.parseInt(id);
  }

  return categories;
}

export default async function Home() {
  const categories = await getTaxonomy();
  return (
    <main>
      <Stack h="100vh" justify="center" align="center" pos="relative" gap="xl">
        <Title mb="xl" c="gray.8">
          Merchant Center Taxonomy Explorer
        </Title>
        <PickerCard categories={categories} />

        <Box w="100%" pos="absolute" bottom={0}>
          <Center mb="xl">
            <Stack px="xl" maw="1000px">
              <Title order={3} c="gray.8">
                What is this tool?
              </Title>
              <Text c="gray.8">
                Including <code>google_product_category</code> in your Google Shopping feed is important because it
                helps Google accurately categorize your products, improving their visibility in relevant searches.
                Proper categorization enhances ad targeting, boosts click-through rates, and ensures compliance with
                Google&apos;s policies. This tool helps you navigate the complex{" "}
                <Anchor href={TAXONOMY_URL} target="_blank">
                  taxonomy of Google Shopping
                </Anchor>{" "}
                by parsing their taxonomy file and displaying it in an easy to use format.
              </Text>
            </Stack>
          </Center>
          <Box
            p="sm"
            px="xl"
            style={{
              background:
                "radial-gradient(39.05% 32.29% at 54.62% 65.05%, rgba(194, 92, 130, 0.2) 0%, rgba(194, 92, 130, 0) 100%), radial-gradient(85.61% 95.9% at 96.67% 34%, rgba(153, 89, 237, 0.2) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(62.77% 144.63% at 4.87% 13.17%, rgba(255, 238, 116, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            <Text>
              Made with ♥ by{" "}
              <Anchor fw={500} td="underline" href="https://shelfwizard.com/en?utm_source=google-taxo" target="_blank">
                Shelf Wizard
              </Anchor>{" "}
              | Get the source on{" "}
              <Anchor
                fw={500}
                td="underline"
                href="https://github.com/shelfwizard/merchant-center-taxonomy-explorer"
                target="_blank"
              >
                Github
              </Anchor>
            </Text>
          </Box>
        </Box>
      </Stack>
    </main>
  );
}
