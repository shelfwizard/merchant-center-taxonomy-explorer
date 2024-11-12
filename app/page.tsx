import { TaxonomyChildren, type TaxonomyNode } from "@/types/TaxonomyNode.type";
import { Anchor, Box, Center, Stack, Text, Title } from "@mantine/core";
import { PickerCard } from "./components/PickerCard";

import { WhatIsThis } from "./components/WhatIsThis";
import pageCss from "./page.module.css";

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
    <Stack component="main" className={pageCss.mainWrapper} pos="relative" gap="xl" pt="xl">
      <Stack gap="xl" align="center" px="md">
        <Title c="gray.8" style={{ textAlign: "center" }}>
          Merchant Center Taxonomy Explorer
        </Title>
        <PickerCard categories={categories} />
      </Stack>

      <Box className={pageCss.footer} w="100%">
        <WhatIsThis taxonomyUrl={TAXONOMY_URL} />

        <Box
          p="sm"
          px="xl"
          style={{
            background:
              "radial-gradient(39.05% 32.29% at 54.62% 65.05%, rgba(194, 92, 130, 0.2) 0%, rgba(194, 92, 130, 0) 100%), radial-gradient(85.61% 95.9% at 96.67% 34%, rgba(153, 89, 237, 0.2) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(62.77% 144.63% at 4.87% 13.17%, rgba(255, 238, 116, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          <Text className={pageCss.footerLinks}>
            Made with ♥ by{" "}
            <Anchor fw={500} td="underline" href="https://shelfwizard.com/en?utm_source=google-taxo" target="_blank">
              Shelf Wizard
            </Anchor>{" "}
            | Get the{" "}
            <Anchor
              fw={500}
              td="underline"
              href="https://github.com/shelfwizard/merchant-center-taxonomy-explorer"
              target="_blank"
            >
              source
            </Anchor>
          </Text>
        </Box>
      </Box>
    </Stack>
  );
}
