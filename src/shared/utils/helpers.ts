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

export function generateTimeList() {
  const times: {
    value: string;
    label: string;
  }[] = [];

  Array.from({ length: 24 }).forEach((_, hour) => {
    Array.from({ length: 2 }).forEach((__, index) => {
      const minute = index * 30;
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      times.push({ value: `${formattedHour}:${formattedMinute}`, label: `${formattedHour}:${formattedMinute}` });
    });
  });
  return times;
}