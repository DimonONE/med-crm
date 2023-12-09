import { InfiniteData } from '@tanstack/react-query';

export type FilterObject = {
  [key: string]: boolean | string | number | null;
};

export const handleScroll = (
  ref: React.RefObject<HTMLInputElement>,
  otherRef: React.RefObject<HTMLInputElement>,
) => () => {
  const scrollTop = ref?.current?.scrollTop || 0;
  const otherRefCurrent = otherRef.current;

  if (otherRefCurrent) {
    otherRefCurrent.scrollTop = scrollTop;
  }
};

export function dataLength<T>(data: InfiniteData<T[]> | undefined) {
  return data?.pages.reduce((total, page) => total + page.length, 0) || 0;
}


export function filterObject(obj: FilterObject) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => ![undefined, null,  ''].includes(value?.toString())),
  );
}