import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import TimeRange from 'react-timeline-range-slider';
import './styles.scss';
import { Api } from '~shared/api/realworld';
import ArrowLeftICO from '../../svg/arrow-left-ico.svg';
import ArrowRightICO from '../../svg/arrow-right-ico.svg';
import { createIntervals, createIntervalsParse, createNewInterval, findChangedTime, getTodayAtSpecificHour, mergeIntervals } from './utils/fn';
import { Interval } from './utils/type';

type IProps = {
  id: string
  startTime: Dayjs
  endTime: Dayjs
  handleChange: (data: Api.TimesDtoDto[]) => void
  width?: string | number
  defaultTimeValue?: Api.TimesDtoDto[]
  workTimes?: Api.UserWorkTimeEntityDto[]
};

export function TimeScale(props: IProps) {
  const {
    id,
    startTime,
    endTime,
    workTimes,
    width = 650,
    handleChange,
    defaultTimeValue,
  } = props;

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


    if (workTimes && changedTime) {
      const isTimeWork = workTimes.filter((workTime) => changedTime.isBetween(workTime.startTime, workTime.endTime, null, '[]')).length !== 0;

      if (!isTimeWork) {
        return;
      }
    }

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
    const updatedIntervals = intervals.filter(({ start, end }: Interval) =>
      !time.isBetween(start, end, null, '[]'),
    ).flatMap(
      ({ start, end }: Interval) => [start.toDate(), end.toDate()],
    );

    setSelectedIntervals(updatedIntervals);
  };

  useEffect(() => {
    const reactTimeRangeContainer = document.querySelector(`#time-range-${id} .react_time_range__time_range_container`);
    if (reactTimeRangeContainer) {
      const reactTimeRange = reactTimeRangeContainer.querySelectorAll('.react_time_range__track');

      reactTimeRange.forEach((element, index) => {
        const existingBorderBlok = element.querySelector('.border-blok');

        if (!existingBorderBlok) {
          const borderBlok = document.createElement('div');
          borderBlok.className = 'border-blok';
          element.appendChild(borderBlok);
        }

        if (index % 2 === 0 && !element.hasAttribute('data-contextmenu')) {
          const contextMenuHandler = (event: Event) => {
            event.preventDefault();
            console.log('contextMenuHandler');
            const intervals: Interval[] = createIntervals(selectedIntervals);
            deleteTime(dayjs(intervals[0].start, 'HH:mm'), intervals);
          };

          // const reactTimeRangeLabel = Array.from(document.querySelectorAll('.react_time_range__time_range_container .react_time_range__tick_label'));
          // const isTimeRange = reactTimeRangeLabel.filter((rangeLabel) => {
          //   if ((rangeLabel instanceof HTMLElement && rangeLabel.style) &&
          //     (element instanceof HTMLElement && element.style)) {

          //     const elementLeft = parseInt(element.style.left || '0', 10);
          //     const rangeLabelLeft = parseInt(rangeLabel.style.left || '0', 10);
          //     const rangeLabelWidth = parseInt(rangeLabel.style.width || '0', 10);

          //     console.log('rangeLabel.innerHTML:', rangeLabel.innerHTML);
          //     console.log('rangeLabelLeft <= elementLeft && elementLeft >= (rangeLabelLeft + rangeLabelWidth):', rangeLabelLeft <= elementLeft && elementLeft >= (rangeLabelLeft + rangeLabelWidth));

          //     // console.log('elementLeft:', elementLeft);
          //     // console.log('rangeLabelLeft:', rangeLabelLeft);
          //     // console.log('rangeLabelWidth:', rangeLabelWidth);
          //     // console.log('rangeLabelLeft + rangeLabelWidth', rangeLabelLeft + rangeLabelWidth);
          //     // console.log('elementLeft <= rangeLabelLeft + rangeLabelWidth:', elementLeft <= (rangeLabelLeft + rangeLabelWidth));
          //     // console.log('(elementLeft >= (rangeLabelLeft + rangeLabelWidth):', elementLeft >= (rangeLabelLeft + rangeLabelWidth));

          //     if ((elementLeft <= rangeLabelLeft + rangeLabelWidth) && (elementLeft >= (rangeLabelLeft + rangeLabelWidth))) {
          //       // console.log(element);

          //       return true;
          //     }
          //   }
          //   return false;
          // });

          // if (isTimeRange.length) {
          //   console.log('rangeLabel.innerHTML', isTimeRange);
          //   // element.setAttribute('data-time-range', isTimeRange[0]);
          // }

          element.setAttribute('data-contextmenu', 'true');
          element.addEventListener('contextmenu', contextMenuHandler, { once: true });

          // if (index % 2 === 0 && !element.hasAttribute('data-contextmenu')) {
          //   contextMenuHandler = (event: Event) => {
          //     event.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
          //     const { parentElement } = element;
          //     if (parentElement) {
          //       parentElement.removeChild(element);
          //       console.log('Элемент удален');
          //     } else {
          //       console.log('Ошибка: Родительский элемент не найден');
          //     }
          //     // Добавьте код для удаления выбранной тайм шкалы или что-то еще
          //   };

          //   element.setAttribute('data-contextmenu', 'true');
          //   element.addEventListener('contextmenu', contextMenuHandler, { once: true });
          // }
        }
      });
    }

    const intervals: Interval[] = createIntervals(selectedIntervals);
    const timeIntervals = intervals.map(time => ({
      startTime: dayjs(time.start).toISOString(),
      endTime: dayjs(time.end).toISOString(),
    }));

    const defaultDateTime = dayjs(defaultTime).format('YYYY-MM-DDTHH:mm:ss');
    const intervalsDateTime = dayjs(timeIntervals[0].startTime).format('YYYY-MM-DDTHH:mm:ss');
    const isDefault = timeIntervals.length === 1 && (defaultDateTime === intervalsDateTime);

    if (!isDefault) {
      handleChange(timeIntervals);
    }

    // return () => {
    //   reactTimeRangeContainer.forEach(item => {
    //     const reactTimeRange = item.querySelectorAll('.react_time_range__track');
    //     reactTimeRange.forEach((element) => {
    //       element.removeAttribute('data-contextmenu');
    //       element.removeEventListener('contextmenu', contextMenuHandler);
    //     });
    //   });
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIntervals, id]);

  useEffect(() => {
    if (defaultTimeValue?.length) {
      const timeValues = createIntervalsParse(defaultTimeValue);
      setSelectedIntervals(timeValues);
    }
  }, [defaultTimeValue]);

  useEffect(() => {
    const reactTimeRangeContainer = document.querySelector(`#time-range-${id} .react_time_range__time_range_container`);
    if (workTimes && reactTimeRangeContainer) {
      const reactTimeRangeLabel = Array.from(reactTimeRangeContainer.querySelectorAll('.react_time_range__tick_label'));
      reactTimeRangeLabel.forEach(rangeLabel => {
        const time = rangeLabel.innerHTML.split(':');
        const changedTime = dayjs().set('hour', Number(time[0])).set('minute', Number(time[1]));
        const isTimeWork = workTimes.filter((workTime) => changedTime.isBetween(workTime.startTime, workTime.endTime, null, '[]')).length !== 0;

        if (!isTimeWork) {
          rangeLabel.classList.add('disabled');
        }
      });
    }
  }, [workTimes, id]);

  return (
    <Box
      id={`time-range-${id}`}
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
