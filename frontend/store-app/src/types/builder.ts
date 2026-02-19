// --- Block type discriminator ---
export type BlockType = 'product' | 'button' | 'row' | 'box' | 'table' | 'html';

// --- Type-specific props ---
export interface ProductBlockProps {
  productId: string | null;
}

export interface ButtonBlockProps {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface RowBlockProps {
  gap: number;
  justify: 'start' | 'center' | 'end' | 'between';
}

export interface BoxBlockProps {
  padding: number;
  margin: number;
  backgroundColor: string;
}

export interface TableBlockProps {
  rows: number;
  cols: number;
  cells: string[][];
}

export interface HtmlBlockProps {
  content: string;
}

// --- Core block ---
export interface BuilderBlock {
  id: string;
  type: BlockType;
  props: ProductBlockProps | ButtonBlockProps | RowBlockProps | BoxBlockProps | TableBlockProps | HtmlBlockProps;
  children: BuilderBlock[];
}

// --- Per-page builder state ---
export interface BuilderPageState {
  blocks: BuilderBlock[];
  selectedBlockId: string | null;
}

// --- API payload ---
export interface BuilderData {
  blocks: BuilderBlock[];
}

// --- Block catalog entry (for library panel) ---
export interface BlockCatalogEntry {
  type: BlockType;
  labelKey: string;
  icon: string;
  defaultProps: BuilderBlock['props'];
  isContainer: boolean;
}
