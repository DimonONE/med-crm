import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import TimeRange from 'react-timeline-range-slider';
import './styles.scss';
import ArrowLeftICO from '../../svg/arrow-left-ico.svg';
import ArrowRightICO from '../../svg/arrow-right-ico.svg';
// import CloseICO from '../../svg/close-gray-ico.svg';
import { createIntervals, createNewInterval, findChangedTime, getTodayAtSpecificHour, mergeIntervals } from './utils/fn';
import { Interval } from './utils/type';


type IProps = {
  startTime: Dayjs
  endTime: Dayjs
};


export function TimeScale({ startTime, endTime }: IProps) {
  const defaultTime = dayjs().hour(9).minute(11).second(11).toDate();
  const [timelineInterval, setTimelineInterval] = useState<[Date, Date]>([
    startTime.toDate(),
    endTime.toDate(),
  ]);
  const [selectedIntervals, setSelectedIntervals] = useState<Date[]>([
    defaultTime,
  ]);
  const [arrowButtonPressed, setArrowButtonPressed] = useState(false);
  let isClickToInterval: boolean | null = null;

  const onChangeCallback = (selectedTimeIntervals: Date[]) => {
    if (arrowButtonPressed) {
      setArrowButtonPressed(false);
      return;
    }

    let intervals: Interval[] = createIntervals(selectedTimeIntervals);
    const changedTime: Dayjs | null = findChangedTime(intervals, selectedIntervals);

    if (changedTime || selectedIntervals.length === 1) {
      const prevInterval: Interval[] = createIntervals(selectedIntervals);
      const defaultPrev = dayjs(prevInterval[0].start).isSame(defaultTime) ? [] : prevInterval;

      const newInterval = createNewInterval(
        dayjs(changedTime),
        prevInterval,
      );

      if (dayjs(prevInterval[0].start).isSame(defaultTime) && !newInterval) {
        return;
      }

      intervals = newInterval && (isClickToInterval == null || isClickToInterval)
        ? [...defaultPrev, newInterval]
        : mergeIntervals(intervals);
    }
    const updatedIntervals: Date[] = intervals.flatMap(
      ({ start, end }: Interval) => [start.toDate(), end.toDate()],
    );

    isClickToInterval = null;
    setSelectedIntervals(updatedIntervals);
  };

  const onUpdateCallback = () => {
    if (selectedIntervals.length === 1) {
      return;
    }
    isClickToInterval = isClickToInterval === null;
  };

  const skipLeft = () => {
    setArrowButtonPressed(true);

    const startTimeSkip = getTodayAtSpecificHour(dayjs(timelineInterval[0]).hour() - 1);
    const endTimeSkip = getTodayAtSpecificHour(dayjs(timelineInterval[1]).hour() - 1);

    if (startTimeSkip.hour() + 1 === 0) {
      setTimelineInterval([
        startTimeSkip.set('hour', 12).toDate(),
        endTimeSkip.set('hour', 24).toDate(),
      ]);
    } else if (startTimeSkip.hour() + 1 === 24) {
      setTimelineInterval([
        getTodayAtSpecificHour(11).toDate(),
        endTimeSkip.hour(23).toDate()]);

    } else
      setTimelineInterval([startTimeSkip.toDate(), endTimeSkip.toDate()]);

  };

  const skipRight = () => {
    setArrowButtonPressed(true);

    const startTimeSkip = getTodayAtSpecificHour(dayjs(timelineInterval[0]).hour() + 1);
    const endTimeSkip = getTodayAtSpecificHour(dayjs(timelineInterval[1]).hour() + 1);

    if (endTimeSkip.hour() === 1) {
      setTimelineInterval([endTimeSkip.toDate(), timelineInterval[0]]);
    } else
      setTimelineInterval([startTimeSkip.toDate(), endTimeSkip.toDate()]);
  };

  useEffect(() => {
    const reactTimeRange = document.querySelectorAll('.react_time_range__time_range_container .react_time_range__track');
    reactTimeRange.forEach((element) => {
      const existingBorderBlok = element.querySelector('.border-blok');

      if (!existingBorderBlok) {
        const borderBlok = document.createElement('div');
        borderBlok.className = 'border-blok';
        element.appendChild(borderBlok);
      }
    });

    // const timeRangeContainer = document.querySelector('.react_time_range__wrapper');
    // const reactTimeRangeLabel = document.querySelectorAll('.react_time_range__time_range_container .react_time_range__tick_label');
    // const containerCloseButton = document.createElement('div');
    // containerCloseButton.style.margin = '0 10px';
    // timeRangeContainer?.appendChild(containerCloseButton);

    // reactTimeRangeLabel.forEach((element) => {
    //   const existingButton = timeRangeContainer?.querySelector('.react_time_range__close-button');
    //   console.log('existingBorderBlok', existingButton);

    //   // ('.react_time_range__close-button');

    //   if (!existingButton && timeRangeContainer) {
    //     const closeButton = document.createElement('button');
    //     closeButton.style.position = 'absolute';
    //     closeButton.style.top = `${element.scrollHeight}px`;
    //     closeButton.style.left = window.getComputedStyle(element).getPropertyValue('left');
    //     closeButton.style.background = 'red';
    //     closeButton.innerHTML = 'red';

    //     closeButton.className = '.react_time_range__close-button';
    //     containerCloseButton.appendChild(closeButton);
    //   }
    // });
    // console.log('selectedIntervals', selectedIntervals);

  }, [selectedIntervals]);





  return (
    <Box
      className='react_time_range__wrapper'
      sx={
        {
          '.react_time_range__tick_label': {
            width: `calc(100% / ${endTime.diff(startTime, 'hour')}) !important`,
          },
        }
      }>
      <button type='button' onClick={skipLeft}> <ArrowLeftICO /></button>
      <TimeRange
        mode={1}
        selectedInterval={selectedIntervals}
        timelineInterval={timelineInterval}
        onUpdateCallback={onUpdateCallback}
        onChangeCallback={onChangeCallback}
      />
      <button type='button' onClick={skipRight}> <ArrowRightICO /></button>
    </Box >
  );
}
