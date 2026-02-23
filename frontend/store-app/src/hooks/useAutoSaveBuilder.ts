import { useEffect, useRef, useCallback } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { useSaveBuilder } from '@/queries/useShopPagesQuery';
import { BuilderBlock } from '@/types/builder';

const DEBOUNCE_MS = 800;

export function useAutoSaveBuilder(pageId: string | null) {
  const saveBuilder = useSaveBuilder();
  const prevBlocksRef = useRef<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    (id: string, blocks: BuilderBlock[]) => {
      saveBuilder.mutate({ id, data: { blocks } });
    },
    [saveBuilder]
  );

  useEffect(() => {
    if (!pageId) return;

    const unsubscribe = useBuilderStore.subscribe((state) => {
      const pageState = state.stateByPageId[pageId];
      if (!pageState) return;

      const serialized = JSON.stringify(pageState.blocks);
      if (serialized === prevBlocksRef.current) return;
      prevBlocksRef.current = serialized;

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        save(pageId, pageState.blocks);
      }, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pageId, save]);

  // Flush on unmount / page switch
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        if (pageId) {
          const pageState = useBuilderStore.getState().stateByPageId[pageId];
          if (pageState) {
            save(pageId, pageState.blocks);
          }
        }
      }
    };
  }, [pageId, save]);

  return { isSaving: saveBuilder.isPending };
}
