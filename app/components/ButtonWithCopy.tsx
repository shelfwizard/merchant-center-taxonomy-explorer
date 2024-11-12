import { Button, ButtonProps, Group, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

import { IconCheck } from "@tabler/icons-react";

export function ButtonWithCopy({
  disabled,
  valueToCopy,
  label,
}: {
  disabled: ButtonProps["disabled"];
  valueToCopy?: string | number;
  label: string;
}) {
  const { copy, copied } = useClipboard({ timeout: 800 });

  return (
    <Button
      radius="lg"
      style={{
        fontWeight: 500,
        transition: "background-color 200ms linear",

        borderWidth: 2,
        ...(disabled
          ? {}
          : {
              backgroundColor: copied ? "green" : "var(--mantine-color-primary-6)",
            }),
      }}
      loaderProps={{
        size: "sm",
        children: (
          <Group gap="xs">
            <IconCheck width="1.5rem" />
            <Text size="sm" fw={500}>
              Done!
            </Text>
          </Group>
        ),
      }}
      loading={copied}
      disabled={disabled}
      onClick={() => valueToCopy && copy(valueToCopy)}
    >
      {label}
    </Button>
  );
}
