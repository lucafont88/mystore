import { create } from 'zustand';
import { BuilderBlock, BuilderPageState } from '@/types/builder';

interface BuilderState {
  stateByPageId: Record<string, BuilderPageState>;

  setBlocks: (pageId: string, blocks: BuilderBlock[]) => void;
  selectBlock: (pageId: string, blockId: string | null) => void;
  addBlock: (pageId: string, block: BuilderBlock, parentId?: string, index?: number) => void;
  moveBlock: (pageId: string, blockId: string, toParentId: string | null, toIndex: number) => void;
  removeBlock: (pageId: string, blockId: string) => void;
  updateBlockProps: (pageId: string, blockId: string, props: Partial<BuilderBlock['props']>) => void;
  reorderBlocks: (pageId: string, parentId: string | null, fromIndex: number, toIndex: number) => void;
  getPageState: (pageId: string) => BuilderPageState;
}

function ensurePageState(state: Record<string, BuilderPageState>, pageId: string): BuilderPageState {
  return state[pageId] ?? { blocks: [], selectedBlockId: null };
}

// --- Recursive tree helpers ---

export function removeBlockFromTree(
  blocks: BuilderBlock[],
  blockId: string
): { remaining: BuilderBlock[]; removed: BuilderBlock | null } {
  let removed: BuilderBlock | null = null;
  const remaining = blocks
    .filter((b) => {
      if (b.id === blockId) {
        removed = b;
        return false;
      }
      return true;
    })
    .map((b) => {
      if (removed) return b;
      const result = removeBlockFromTree(b.children, blockId);
      if (result.removed) removed = result.removed;
      return { ...b, children: result.remaining };
    });
  return { remaining, removed };
}

export function insertBlockInTree(
  blocks: BuilderBlock[],
  block: BuilderBlock,
  parentId: string | null,
  index: number
): BuilderBlock[] {
  if (parentId === null) {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, block);
    return newBlocks;
  }
  return blocks.map((b) => {
    if (b.id === parentId) {
      const newChildren = [...b.children];
      newChildren.splice(index, 0, block);
      return { ...b, children: newChildren };
    }
    return { ...b, children: insertBlockInTree(b.children, block, parentId, index) };
  });
}

export function updatePropsInTree(
  blocks: BuilderBlock[],
  blockId: string,
  props: Partial<BuilderBlock['props']>
): BuilderBlock[] {
  return blocks.map((b) => {
    if (b.id === blockId) return { ...b, props: { ...b.props, ...props } };
    return { ...b, children: updatePropsInTree(b.children, blockId, props) };
  });
}

export function findBlockInTree(blocks: BuilderBlock[], blockId: string): BuilderBlock | null {
  for (const b of blocks) {
    if (b.id === blockId) return b;
    const found = findBlockInTree(b.children, blockId);
    if (found) return found;
  }
  return null;
}

// --- Store ---

export const useBuilderStore = create<BuilderState>()((set, get) => ({
  stateByPageId: {},

  setBlocks: (pageId, blocks) =>
    set((state) => ({
      stateByPageId: {
        ...state.stateByPageId,
        [pageId]: {
          blocks,
          selectedBlockId: state.stateByPageId[pageId]?.selectedBlockId ?? null,
        },
      },
    })),

  selectBlock: (pageId, blockId) =>
    set((state) => ({
      stateByPageId: {
        ...state.stateByPageId,
        [pageId]: { ...ensurePageState(state.stateByPageId, pageId), selectedBlockId: blockId },
      },
    })),

  addBlock: (pageId, block, parentId, index) =>
    set((state) => {
      const ps = ensurePageState(state.stateByPageId, pageId);
      const idx = index ?? (parentId ? 0 : ps.blocks.length);
      return {
        stateByPageId: {
          ...state.stateByPageId,
          [pageId]: {
            blocks: insertBlockInTree(ps.blocks, block, parentId ?? null, idx),
            selectedBlockId: block.id,
          },
        },
      };
    }),

  moveBlock: (pageId, blockId, toParentId, toIndex) =>
    set((state) => {
      const ps = ensurePageState(state.stateByPageId, pageId);
      const { remaining, removed } = removeBlockFromTree(ps.blocks, blockId);
      if (!removed) return state;
      return {
        stateByPageId: {
          ...state.stateByPageId,
          [pageId]: {
            ...ps,
            blocks: insertBlockInTree(remaining, removed, toParentId, toIndex),
          },
        },
      };
    }),

  removeBlock: (pageId, blockId) =>
    set((state) => {
      const ps = ensurePageState(state.stateByPageId, pageId);
      const { remaining } = removeBlockFromTree(ps.blocks, blockId);
      return {
        stateByPageId: {
          ...state.stateByPageId,
          [pageId]: {
            blocks: remaining,
            selectedBlockId: ps.selectedBlockId === blockId ? null : ps.selectedBlockId,
          },
        },
      };
    }),

  updateBlockProps: (pageId, blockId, props) =>
    set((state) => {
      const ps = ensurePageState(state.stateByPageId, pageId);
      return {
        stateByPageId: {
          ...state.stateByPageId,
          [pageId]: { ...ps, blocks: updatePropsInTree(ps.blocks, blockId, props) },
        },
      };
    }),

  reorderBlocks: (pageId, parentId, fromIndex, toIndex) =>
    set((state) => {
      const ps = ensurePageState(state.stateByPageId, pageId);
      const reorder = (arr: BuilderBlock[]): BuilderBlock[] => {
        const copy = [...arr];
        const [moved] = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, moved);
        return copy;
      };

      if (parentId === null) {
        return {
          stateByPageId: {
            ...state.stateByPageId,
            [pageId]: { ...ps, blocks: reorder(ps.blocks) },
          },
        };
      }

      const updateChildren = (blocks: BuilderBlock[]): BuilderBlock[] =>
        blocks.map((b) =>
          b.id === parentId
            ? { ...b, children: reorder(b.children) }
            : { ...b, children: updateChildren(b.children) }
        );

      return {
        stateByPageId: {
          ...state.stateByPageId,
          [pageId]: { ...ps, blocks: updateChildren(ps.blocks) },
        },
      };
    }),

  getPageState: (pageId) => ensurePageState(get().stateByPageId, pageId),
}));
