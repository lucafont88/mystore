import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';
import { useBuilderStore, findBlockInTree } from '@/stores/builderStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BuilderBlock,
  ProductBlockProps,
  ButtonBlockProps,
  RowBlockProps,
  BoxBlockProps,
  TableBlockProps,
  HtmlBlockProps,
} from '@/types/builder';

interface PropertyInspectorProps {
  pageId: string;
}

function ProductFields({
  block,
  pageId,
}: {
  block: BuilderBlock;
  pageId: string;
}) {
  const { t } = useTranslation('shopPages');
  const updateBlockProps = useBuilderStore((s) => s.updateBlockProps);
  const props = block.props as ProductBlockProps;

  return (
    <div className="space-y-3">
      <div>
        <Label>{t('builder.inspector.productId')}</Label>
        <Input
          value={props.productId ?? ''}
          onChange={(e) =>
            updateBlockProps(pageId, block.id, { productId: e.target.value || null })
          }
          placeholder="uuid..."
          className="mt-1"
        />
      </div>
    </div>
  );
}

function ButtonFields({
  block,
  pageId,
}: {
  block: BuilderBlock;
  pageId: string;
}) {
  const { t } = useTranslation('shopPages');
  const updateBlockProps = useBuilderStore((s) => s.updateBlockProps);
  const props = block.props as ButtonBlockProps;

  return (
    <div className="space-y-3">
      <div>
        <Label>{t('builder.inspector.text')}</Label>
        <Input
          value={props.text}
          onChange={(e) => updateBlockProps(pageId, block.id, { text: e.target.value })}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t('builder.inspector.link')}</Label>
        <Input
          value={props.link}
          onChange={(e) => updateBlockProps(pageId, block.id, { link: e.target.value })}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t('builder.inspector.variant')}</Label>
        <Select
          value={props.variant}
          onValueChange={(v) => updateBlockProps(pageId, block.id, { variant: v as ButtonBlockProps['variant'] })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">{t('builder.inspector.variants.primary')}</SelectItem>
            <SelectItem value="secondary">{t('builder.inspector.variants.secondary')}</SelectItem>
            <SelectItem value="outline">{t('builder.inspector.variants.outline')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function RowFields({
  block,
  pageId,
}: {
  block: BuilderBlock;
  pageId: string;
}) {
  const { t } = useTranslation('shopPages');
  const updateBlockProps = useBuilderStore((s) => s.updateBlockProps);
  const props = block.props as RowBlockProps;

  return (
    <div className="space-y-3">
      <div>
        <Label>{t('builder.inspector.gap')}</Label>
        <Input
          type="number"
          value={props.gap}
          onChange={(e) => updateBlockProps(pageId, block.id, { gap: Number(e.target.value) })}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t('builder.inspector.justify')}</Label>
        <Select
          value={props.justify}
          onValueChange={(v) => updateBlockProps(pageId, block.id, { justify: v as RowBlockProps['justify'] })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="start">{t('builder.inspector.justifyOptions.start')}</SelectItem>
            <SelectItem value="center">{t('builder.inspector.justifyOptions.center')}</SelectItem>
            <SelectItem value="end">{t('builder.inspector.justifyOptions.end')}</SelectItem>
            <SelectItem value="between">{t('builder.inspector.justifyOptions.between')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function BoxFields({
  block,
  pageId,
}: {
  block: BuilderBlock;
  pageId: string;
}) {
  const { t } = useTranslation('shopPages');
  const updateBlockProps = useBuilderStore((s) => s.updateBlockProps);
  const props = block.props as BoxBlockProps;

  return (
    <div className="space-y-3">
      <div>
        <Label>{t('builder.inspector.padding')}</Label>
        <Input
          type="number"
          value={props.padding}
          onChange={(e) => updateBlockProps(pageId, block.id, { padding: Number(e.target.value) })}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t('builder.inspector.margin')}</Label>
        <Input
          type="number"
          value={props.margin}
          onChange={(e) => updateBlockProps(pageId, block.id, { margin: Number(e.target.value) })}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t('builder.inspector.backgroundColor')}</Label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="color"
            value={props.backgroundColor}
            onChange={(e) => updateBlockProps(pageId, block.id, { backgroundColor: e.target.value })}
            className="h-8 w-8 cursor-pointer rounded border"
          />
          <Input
            value={props.backgroundColor}
            onChange={(e) => updateBlockProps(pageId, block.id, { backgroundColor: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

function TableFields({
  block,
  pageId,
}: {
  block: BuilderBlock;
  pageId: string;
}) {
  const { t } = useTranslation('shopPages');
  const updateBlockProps = useBuilderStore((s) => s.updateBlockProps);
  const props = block.props as TableBlockProps;

  const handleDimensionChange = (key: 'rows' | 'cols', value: number) => {
    const newRows = key === 'rows' ? value : props.rows;
    const newCols = key === 'cols' ? value : props.cols;
    const newCells: string[][] = Array.from({ length: newRows }, (_, r) =>
      Array.from({ length: newCols }, (_, c) => props.cells[r]?.[c] ?? '')
    );
    updateBlockProps(pageId, block.id, { [key]: value, cells: newCells });
  };

  return (
    <div className="space-y-3">
      <div>
        <Label>{t('builder.inspector.rows')}</Label>
        <Input
          type="number"
          min={1}
          max={20}
          value={props.rows}
          onChange={(e) => handleDimensionChange('rows', Math.max(1, Number(e.target.value)))}
          className="mt-1"
        />
      </div>
      <div>
        <Label>{t('builder.inspector.cols')}</Label>
        <Input
          type="number"
          min={1}
          max={10}
          value={props.cols}
          onChange={(e) => handleDimensionChange('cols', Math.max(1, Number(e.target.value)))}
          className="mt-1"
        />
      </div>
    </div>
  );
}

function HtmlFields({
  block,
  pageId,
}: {
  block: BuilderBlock;
  pageId: string;
}) {
  const { t } = useTranslation('shopPages');
  const updateBlockProps = useBuilderStore((s) => s.updateBlockProps);
  const props = block.props as HtmlBlockProps;

  return (
    <div className="space-y-3">
      <div>
        <Label>{t('builder.inspector.htmlContent')}</Label>
        <textarea
          className="mt-1 h-48 w-full resize-y rounded-md border bg-muted/30 p-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          value={props.content}
          onChange={(e) => updateBlockProps(pageId, block.id, { content: e.target.value })}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

const FIELD_COMPONENTS: Record<
  string,
  React.ComponentType<{ block: BuilderBlock; pageId: string }>
> = {
  product: ProductFields,
  button: ButtonFields,
  row: RowFields,
  box: BoxFields,
  table: TableFields,
  html: HtmlFields,
};

export function PropertyInspector({ pageId }: PropertyInspectorProps) {
  const { t } = useTranslation('shopPages');
  const blocks = useBuilderStore((s) => s.stateByPageId[pageId]?.blocks ?? []);
  const selectedBlockId = useBuilderStore(
    (s) => s.stateByPageId[pageId]?.selectedBlockId ?? null
  );

  const selectedBlock = selectedBlockId ? findBlockInTree(blocks, selectedBlockId) : null;
  const FieldComponent = selectedBlock ? FIELD_COMPONENTS[selectedBlock.type] : null;

  return (
    <div className="flex h-full w-64 flex-col border-l bg-muted/30">
      <div className="border-b p-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Settings className="h-4 w-4" />
          {t('builder.inspector.title')}
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {selectedBlock && FieldComponent ? (
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {selectedBlock.type}
            </p>
            <FieldComponent block={selectedBlock} pageId={pageId} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            {t('builder.inspector.noSelection')}
          </div>
        )}
      </div>
    </div>
  );
}
