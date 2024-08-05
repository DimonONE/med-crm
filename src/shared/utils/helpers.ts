import { InfiniteData } from '@tanstack/react-query';
import { Values } from '~entities/work-time';

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

export function generateTimeList(activeTimes: Values[]) {
  const times: {
    value: string;
    label: string;
  }[] = [];
console.log('activeTimes', activeTimes);

  activeTimes.forEach((time) => {
    const hour = time.time.split(':')[0];
    Array.from({ length: 4 }).forEach((__, index) => {
      const minute = index * 15;
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      times.push({ value: `${formattedHour}:${formattedMinute}`, label: `${formattedHour}:${formattedMinute}` });
    });
  });
  return times;
}