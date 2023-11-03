// @ts-nocheck

import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Interval } from './type';

dayjs.extend(isBetween);
const now = dayjs();

export const getTodayAtSpecificHour = (hour = 12): Dayjs =>
  now.set('hour', hour).startOf('hour');

export const createIntervals = (intervals: Date[]): Interval[] =>
  intervals.reduce((acc: Interval[], _, index: number, array: string[]) => {
    if ((index % 2 === 0 && array[index + 1]) || intervals.length === 1) {
      const start: Dayjs = dayjs(array[index]);
      const end: Dayjs = dayjs(array[index + 1]);
      acc.push({ start, end });
    }
    return acc;
  }, []);

export const mergeIntervals = (intervals: Interval[]): Interval[] =>
  intervals.reduce((acc: Interval[], currentInterval: Interval) => {
    const lastMergedInterval: Interval | undefined = acc[acc.length - 1];
    if (
      lastMergedInterval &&
      lastMergedInterval.end.isSame(currentInterval.start)
    ) {
      lastMergedInterval.end = lastMergedInterval.end.isSame(currentInterval.end)
        ? lastMergedInterval.end
        : currentInterval.end;
    } else {
      acc.push({ ...currentInterval });
    }
    return acc;
  }, []);

export const isValueInTimeRange = (
  currentTime: Dayjs,
  existingIntervals: Interval[],
): boolean =>
  existingIntervals.some(({ start, end }: Interval) =>
    currentTime.isBetween(start, end, null, '[]'),
  );

export const createNewInterval = (
  currentTime: Dayjs,
  existingIntervals: Interval[],
): Interval | null => {
  const isTimeRange: boolean = isValueInTimeRange(
    currentTime,
    existingIntervals,
  );
  const endTime: Dayjs = currentTime.add(30, 'minutes');
  return !isTimeRange ? { start: currentTime, end: endTime } : null;
};

export const findChangedTime = (
  intervals: Interval[],
  selectedIntervals: Date[],
): Dayjs | null => {
  const changedTimes: Dayjs[] = [];
  intervals.forEach((interval: Interval) => {
    const correspondingPrevInterval: Interval | undefined = createIntervals(
      selectedIntervals,
    ).find(
      (prevInterval: Interval) =>
        dayjs(prevInterval.start).isSame(interval.start) ||
        dayjs(prevInterval.end).isSame(interval.end),
    );
    if (correspondingPrevInterval) {
      if (!interval.start.isSame(correspondingPrevInterval.start)) {
        changedTimes.push(interval.start);
      }
      if (!interval.end.isSame(correspondingPrevInterval.end)) {
        changedTimes.push(interval.end);
      }
    }
  });

  return changedTimes[0] || null;
};

