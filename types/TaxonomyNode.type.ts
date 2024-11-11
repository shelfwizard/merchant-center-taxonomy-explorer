export type TaxonomyChildren = { [key: string]: TaxonomyNode };

export type TaxonomyNode = {
  id?: number;
  children?: TaxonomyChildren;
};
