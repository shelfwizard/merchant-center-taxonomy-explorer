"use client";
import { Anchor, Button, Center, Collapse, rem, Stack, Text, Title } from "@mantine/core";
import { IconCaretDownFilled, IconCaretRightFilled } from "@tabler/icons-react";

import moduleCss from "./WhatIsThis.module.css";

import { useState } from "react";

function Explanation({ taxonomyUrl }: { taxonomyUrl: string }) {
  return (
    <Text c="gray.8">
      Including <code>google_product_category</code> in your Google Shopping feed is important because it helps Google
      accurately categorize your products, improving their visibility in relevant searches. Proper categorization
      enhances ad targeting, boosts click-through rates, and ensures compliance with Google&apos;s policies. This tool
      helps you navigate the complex{" "}
      <Anchor href={taxonomyUrl} target="_blank">
        taxonomy of Google Shopping
      </Anchor>{" "}
      by parsing their taxonomy file and displaying it in an easy to use format.
    </Text>
  );
}

export function WhatIsThis({ taxonomyUrl }: { taxonomyUrl: string }) {
  const [showExplanation, setShowExplanation] = useState(false);
  return (
    <>
      <Stack px="md" maw="1000px" visibleFrom="sm" mb="xl" mx="auto">
        <Title order={3} c="gray.8">
          What is this tool?
        </Title>
        <Explanation taxonomyUrl={taxonomyUrl} />
      </Stack>

      <Stack px="md" hiddenFrom="sm" justify="start" mb="sm">
        <Button
          size="md"
          variant="transparent"
          leftSection={
            <IconCaretRightFilled
              width="18px"
              className={showExplanation ? moduleCss.caretOpen : moduleCss.caretClosed}
            />
          }
          fw={500}
          onClick={() => setShowExplanation(!showExplanation)}
        >
          What is this tool?
        </Button>

        <Collapse in={showExplanation}>
          <Explanation taxonomyUrl={taxonomyUrl} />
        </Collapse>
      </Stack>
    </>
  );
}
