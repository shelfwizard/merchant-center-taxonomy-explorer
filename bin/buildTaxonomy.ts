import fs from "node:fs";
import axios from "axios";
import { type TaxonomyNode } from "@/types/TaxonomyNode.type";
import path from "path";

const TAXONOMY_URL = "https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt";

async function main() {
  const result = await axios.get<string>(TAXONOMY_URL);

  const categories: { [key: string]: TaxonomyNode } = {};

  for (const row of result.data.split("\n")) {
    // skip comments
    if (!row || row.trim().startsWith("#")) continue;

    const [id, fullName] = row.split(" - ");

    if (!fullName) {
      console.dir(row);
    }
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

  fs.writeFileSync(path.resolve("app/categories.json"), JSON.stringify(categories));
}

Promise.resolve(main());
