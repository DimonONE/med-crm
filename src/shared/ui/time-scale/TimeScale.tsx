import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import TimeRange from 'react-timeline-range-slider';
import './styles.scss';
import ArrowLeftICO from '../../svg/arrow-left-ico.svg';
import ArrowRightICO from '../../svg/arrow-right-ico.svg';
import closeICO from './img/close-ico.png';
import { createIntervals, createNewInterval, findChangedTime, getTodayAtSpecificHour, mergeIntervals } from './utils/fn';
import { Interval } from './utils/type';

type IProps = {
  startTime: Dayjs
  endTime: Dayjs
  width?: string | number
};

export function TimeScale({ startTime, endTime, width = 650 }: IProps) {
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

  const deleteTime = (time: Dayjs, intervals: Interval[]) => {
    const updatedIntervals: Date[] = intervals.reduce(
      (result: Interval[], { start, end }: Interval) => {
        if (start.isSame(time) || end.isSame(time) || (time.isAfter(start) && time.isBefore(end))) {
          // Если time равен start, end или попадает в диапазон start -> end
          // Удалить ровно час из интервала
          const updatedStart = start.isSame(time) ? start.add(1, 'hour') : start;
          const updatedEnd = end.isSame(time) ? end.subtract(1, 'hour') : end;

          if (updatedStart.isBefore(updatedEnd)) {
            // Если интервал остался ненулевой длины, добавить обновленный интервал в результат
            result.push({ start: updatedStart, end: updatedEnd });
          }
        } else {
          // Если интервал не подходит под условия, добавить его в результат без изменений
          result.push({ start, end });
        }
        return result;
      },
      [],
    ).flatMap(
      ({ start, end }: Interval) => [start.toDate(), end.toDate()],
    );

    // isClickToInterval = null;
    setSelectedIntervals(updatedIntervals);
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

    // Close buttons time line

    const timeRangeContainer = document.querySelector('.react_time_range__wrapper');
    const reactTimeRangeLabel = document.querySelectorAll('.react_time_range__time_range_container .react_time_range__tick_label');
    const existingContainerCloseButton = timeRangeContainer?.querySelector('.react_time_range__close_button_container');

    const containerCloseButton = document.createElement('div');
    if (!existingContainerCloseButton) {
      containerCloseButton.className = 'react_time_range__close_button_container';
      containerCloseButton.style.width = `${typeof width === 'string' ? width : `${width}px`}`;
      timeRangeContainer?.appendChild(containerCloseButton);
    }

    reactTimeRangeLabel.forEach((element) => {

      if (timeRangeContainer) {
        const closeButton = document.createElement('button');
        closeButton.className = 'react_time_range__close-button';
        closeButton.style.top = `${element.scrollHeight}px`;
        closeButton.style.width = `calc(100% / ${endTime.diff(startTime, 'hour')})`;

        const intervals: Interval[] = createIntervals(selectedIntervals);

        closeButton.onclick = () => deleteTime(dayjs(element.innerHTML, 'HH:mm'), intervals);

        const closeButtonICO = document.createElement('img');
        closeButtonICO.src = closeICO;


        closeButton.appendChild(closeButtonICO);
        containerCloseButton.appendChild(closeButton);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIntervals]);


  return (
    <Box
      className='react_time_range__wrapper'
      sx={
        {
          '.react_time_range__time_range_container': {
            width: `${typeof width === 'string' ? width : `${width}px`} !important`,
          },
          '.react_time_range__tick_label': {
            width: `calc(100% / ${endTime.diff(startTime, 'hour')}) !important`,
          },
        }
      }>
      <div className='react_time_range__time_content'>
        <button type='button' onClick={skipLeft}> <ArrowLeftICO /></button>
        <TimeRange
          step={1800000 / 2}
          mode={1}
          selectedInterval={selectedIntervals}
          timelineInterval={timelineInterval}
          onUpdateCallback={onUpdateCallback}
          onChangeCallback={onChangeCallback}
        />
        <button type='button' onClick={skipRight}> <ArrowRightICO /></button>
      </div>
    </Box >
  );
}
