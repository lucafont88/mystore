import {
  BuilderBlock,
  BlockType,
  ProductBlockProps,
  ButtonBlockProps,
  RowBlockProps,
  BoxBlockProps,
  TableBlockProps,
  HtmlBlockProps,
} from '@/types/builder';

const KNOWN_TYPES = new Set<BlockType>(['product', 'button', 'row', 'box', 'table']);

const REVERSE_JUSTIFY: Record<string, RowBlockProps['justify']> = {
  'flex-start': 'start',
  center: 'center',
  'flex-end': 'end',
  'space-between': 'between',
};

function parseStyleValue(el: Element, prop: string): string {
  return (el as HTMLElement).style?.getPropertyValue(prop) ?? '';
}

function parseNumericStyle(el: Element, prop: string, fallback: number): number {
  const raw = parseStyleValue(el, prop).replace('px', '');
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function parseChildren(el: Element): BuilderBlock[] {
  const children: BuilderBlock[] = [];
  for (let i = 0; i < el.children.length; i++) {
    const child = elementToBlock(el.children[i]);
    if (child) children.push(child);
  }
  return children;
}

function elementToBlock(el: Element): BuilderBlock | null {
  const type = el.getAttribute('data-block-type') as BlockType | null;
  if (!type || !KNOWN_TYPES.has(type)) return null;

  const id = el.getAttribute('data-block-id') || crypto.randomUUID();

  switch (type) {
    case 'product': {
      const productId = el.getAttribute('data-product-id') || null;
      const props: ProductBlockProps = { productId };
      return { id, type, props, children: [] };
    }

    case 'button': {
      const variant = (el.getAttribute('data-variant') || 'primary') as ButtonBlockProps['variant'];
      const text = el.textContent ?? '';
      const link = el.getAttribute('href') ?? '#';
      const props: ButtonBlockProps = { text, link, variant };
      return { id, type, props, children: [] };
    }

    case 'row': {
      const gap = parseNumericStyle(el, 'gap', 8);
      const justifyRaw = parseStyleValue(el, 'justify-content');
      const justify = REVERSE_JUSTIFY[justifyRaw] ?? 'start';
      const props: RowBlockProps = { gap, justify };
      return { id, type, props, children: parseChildren(el) };
    }

    case 'box': {
      const padding = parseNumericStyle(el, 'padding', 16);
      const margin = parseNumericStyle(el, 'margin', 0);
      const backgroundColor = parseStyleValue(el, 'background-color') || '#ffffff';
      const props: BoxBlockProps = { padding, margin, backgroundColor };
      return { id, type, props, children: parseChildren(el) };
    }

    case 'table': {
      const rows = Number(el.getAttribute('data-rows')) || 2;
      const cols = Number(el.getAttribute('data-cols')) || 2;
      const cells: string[][] = [];
      const trElements = el.querySelectorAll('tr');
      for (let r = 0; r < rows; r++) {
        const row: string[] = [];
        const tds = trElements[r]?.querySelectorAll('td') ?? [];
        for (let c = 0; c < cols; c++) {
          row.push(tds[c]?.textContent ?? '');
        }
        cells.push(row);
      }
      const props: TableBlockProps = { rows, cols, cells };
      return { id, type, props, children: [] };
    }

    default:
      return null;
  }
}

export function htmlToBlocks(html: string): BuilderBlock[] {
  if (!html.trim()) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const blocks: BuilderBlock[] = [];

  for (let i = 0; i < doc.body.children.length; i++) {
    const el = doc.body.children[i];
    const block = elementToBlock(el);
    if (block) {
      blocks.push(block);
    } else {
      // Unknown element → wrap as html block
      const props: HtmlBlockProps = { content: el.outerHTML };
      blocks.push({
        id: crypto.randomUUID(),
        type: 'html',
        props,
        children: [],
      });
    }
  }

  return blocks;
}
