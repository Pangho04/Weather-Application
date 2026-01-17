import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * @interface UseScrollBottomFadeOptions
 * @property {number} threshold - 하단 도달 여부 판단 픽셀 값 (기본값: 5)
 * @property {React.DependencyList} deps - 스크롤 감지 의존성 배열 (기본값: [])
 */
interface UseScrollBottomFadeOptions {
  threshold?: number;
  deps?: React.DependencyList;
}

/**
 * @interface UseScrollBottomFadeReturn
 * @property {React.RefObject<T>} scrollRef - 스크롤 부모 요소 ref
 * @property {boolean} showBottomFade - 하단 dim 표시 여부
 */
interface UseScrollBottomFadeReturn<T extends HTMLElement = HTMLElement> {
  scrollRef: React.RefObject<T>;
  showBottomFade: boolean;
}

/**
 * 스크롤 가능한 요소에서 하단에 도달하지 않았을 때 dim 효과를 표시하는 hook
 */
export function useScrollBottomFade<T extends HTMLElement = HTMLElement>(
  options: UseScrollBottomFadeOptions = {},
): UseScrollBottomFadeReturn<T> {
  const { threshold = 5, deps = [] } = options;
  const [showBottomFade, setShowBottomFade] = useState(false);
  const scrollRef = useRef<T>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    const hasScrollableContent = scrollHeight > clientHeight;

    setShowBottomFade(hasScrollableContent && !isAtBottom);
  }, [threshold]);

  /**
   * @when 컴포넌트 마운트 시
   * @expect 스크롤 이벤트 리스너 추가
   * @clear 스크롤 이벤트 리스너 제거
   */
  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);

    resizeObserver.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [handleScroll, deps]);

  return {
    scrollRef,
    showBottomFade,
  };
}
