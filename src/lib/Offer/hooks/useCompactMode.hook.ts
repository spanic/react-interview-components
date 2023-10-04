import useResizeObserver from '@react-hook/resize-observer';
import {RefObject, useCallback, useLayoutEffect, useState} from 'react';

/**
 * Hook that tracks the provided `containerRef` width changes and compares it with passed `minWidth`.
 * Note: this is designed to work **only for single-row flex containers with `flex-wrap: none`**;
 *
 * @param containerRef container ref which width changes will be tracked by resize observer
 * @param minWidth min width of the container, after bypassing which compact mode shall be applied
 * @returns result compact mode boolean flag or `undefined` if resize event has not been triggered yet
 */
const useCompactMode = (
  containerRef: RefObject<HTMLDivElement>,
  minWidth: number
) => {
  const [isCompactMode, setCompactMode] = useState<boolean | undefined>(
    undefined
  );

  const isContainerTooNarrow = useCallback(
    (containerWidth: number): boolean =>
      containerWidth > 0 && containerWidth <= minWidth,
    [minWidth]
  );

  useLayoutEffect(() => {
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width || 0;
    setCompactMode(isContainerTooNarrow(containerWidth));
  }, []);

  useResizeObserver(containerRef, entry => {
    const containerWidth = entry.contentRect.width;
    setCompactMode(isContainerTooNarrow(containerWidth));
  });

  return isCompactMode;
};

export default useCompactMode;
