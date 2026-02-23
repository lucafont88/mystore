import {
  BlockCatalogEntry,
  BuilderBlock,
  ProductBlockProps,
  ButtonBlockProps,
  RowBlockProps,
  BoxBlockProps,
  TableBlockProps,
  HtmlBlockProps,
} from '@/types/builder';

export const BLOCK_CATALOG: BlockCatalogEntry[] = [
  {
    type: 'product',
    labelKey: 'builder.blocks.product',
    icon: 'ShoppingBag',
    defaultProps: { productId: null } satisfies ProductBlockProps,
    isContainer: false,
  },
  {
    type: 'button',
    labelKey: 'builder.blocks.button',
    icon: 'MousePointerClick',
    defaultProps: { text: 'Click me', link: '#', variant: 'primary' } satisfies ButtonBlockProps,
    isContainer: false,
  },
  {
    type: 'row',
    labelKey: 'builder.blocks.row',
    icon: 'Columns3',
    defaultProps: { gap: 8, justify: 'start' } satisfies RowBlockProps,
    isContainer: true,
  },
  {
    type: 'box',
    labelKey: 'builder.blocks.box',
    icon: 'Square',
    defaultProps: { padding: 16, margin: 0, backgroundColor: '#ffffff' } satisfies BoxBlockProps,
    isContainer: true,
  },
  {
    type: 'table',
    labelKey: 'builder.blocks.table',
    icon: 'Table',
    defaultProps: { rows: 2, cols: 2, cells: [['', ''], ['', '']] } satisfies TableBlockProps,
    isContainer: false,
  },
  {
    type: 'html',
    labelKey: 'builder.blocks.html',
    icon: 'Code2',
    defaultProps: { content: '<p>Custom HTML</p>' } satisfies HtmlBlockProps,
    isContainer: false,
  },
];

export function createBlock(catalogEntry: BlockCatalogEntry): BuilderBlock {
  return {
    id: crypto.randomUUID(),
    type: catalogEntry.type,
    props: { ...catalogEntry.defaultProps },
    children: [],
  };
}
