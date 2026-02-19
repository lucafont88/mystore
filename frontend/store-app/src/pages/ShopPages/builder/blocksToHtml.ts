import {
  BuilderBlock,
  ButtonBlockProps,
  RowBlockProps,
  BoxBlockProps,
  TableBlockProps,
  ProductBlockProps,
  HtmlBlockProps,
} from '@/types/builder';

const JUSTIFY_MAP: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
};

const BUTTON_STYLES: Record<string, string> = {
  primary:
    'display:inline-block; padding:8px 16px; border-radius:6px; background-color:#4f46e5; color:#fff; text-decoration:none; font-weight:500;',
  secondary:
    'display:inline-block; padding:8px 16px; border-radius:6px; background-color:#6b7280; color:#fff; text-decoration:none; font-weight:500;',
  outline:
    'display:inline-block; padding:8px 16px; border-radius:6px; border:1px solid #4f46e5; color:#4f46e5; text-decoration:none; font-weight:500; background:transparent;',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function blockToHtml(block: BuilderBlock): string {
  switch (block.type) {
    case 'product': {
      const props = block.props as ProductBlockProps;
      const pid = props.productId ? ` data-product-id="${escapeHtml(props.productId)}"` : '';
      return `<div data-block-type="product" data-block-id="${block.id}"${pid}></div>`;
    }

    case 'button': {
      const props = block.props as ButtonBlockProps;
      const style = BUTTON_STYLES[props.variant] ?? BUTTON_STYLES.primary;
      return `<a data-block-type="button" data-block-id="${block.id}" data-variant="${props.variant}" href="${escapeHtml(props.link)}" style="${style}">${escapeHtml(props.text)}</a>`;
    }

    case 'row': {
      const props = block.props as RowBlockProps;
      const justify = JUSTIFY_MAP[props.justify] ?? 'flex-start';
      const style = `display:flex; gap:${props.gap}px; justify-content:${justify};`;
      const inner = blocksToHtml(block.children);
      return `<div data-block-type="row" data-block-id="${block.id}" style="${style}">${inner}</div>`;
    }

    case 'box': {
      const props = block.props as BoxBlockProps;
      const style = `padding:${props.padding}px; margin:${props.margin}px; background-color:${props.backgroundColor};`;
      const inner = blocksToHtml(block.children);
      return `<div data-block-type="box" data-block-id="${block.id}" style="${style}">${inner}</div>`;
    }

    case 'table': {
      const props = block.props as TableBlockProps;
      let html = `<table data-block-type="table" data-block-id="${block.id}" data-rows="${props.rows}" data-cols="${props.cols}" style="width:100%; border-collapse:collapse;">`;
      for (let r = 0; r < props.rows; r++) {
        html += '<tr>';
        for (let c = 0; c < props.cols; c++) {
          const cell = props.cells[r]?.[c] ?? '';
          html += `<td style="border:1px solid #e5e7eb; padding:8px;">${escapeHtml(cell)}</td>`;
        }
        html += '</tr>';
      }
      html += '</table>';
      return html;
    }

    case 'html': {
      const props = block.props as HtmlBlockProps;
      return props.content;
    }

    default:
      return '';
  }
}

export function blocksToHtml(blocks: BuilderBlock[]): string {
  return blocks.map(blockToHtml).join('\n');
}
