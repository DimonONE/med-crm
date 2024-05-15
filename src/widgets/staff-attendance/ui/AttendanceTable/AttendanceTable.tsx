import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { attendanceApi } from '~entities/staffAttendance';
import { daysWork } from '~entities/work-time';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import { Button } from '~shared/ui/button';
import { WorkDayInfo } from '~shared/ui/work-day-info';
import s from './styles.module.scss';

export type CreateAttendanceListData = {
  userId: string,
  vacations: Api.UserVacationEntityDto[],
  visits: Api.UserVisitsEntityDto[];
  workTimes: Api.UserWorkTimeEntityDto[],
  timeWeek: number,
  timeMonth: number,
};

type AttendanceListProps = {
  personnelList: CreateAttendanceListData[]
  hasNextPage: boolean | undefined
  dataLength: number
  onScroll: () => void
  handleFetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any>>
  handleUpdateFilters: (newQuery: Partial<attendanceApi.QueryListOfAttendance>) => void
};

type TimesVisits = {
  userId: string
  times: Api.TimesDtoDto[]
};


export const AttendanceTable = React.forwardRef<HTMLDivElement, AttendanceListProps>((props, ref) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [fieldSort, setFieldSort] = useState<string | null | undefined>(undefined);
  const [timesVisits, setTimesVisits] = useState<TimesVisits | null>(null);
  const { personnelList, dataLength, hasNextPage, handleUpdateFilters, handleFetchNextPage, onScroll } = props;
  const { mutate } = attendanceApi.useCreateAttendanceVisits();

  const sortHandler = (sortKey: 'totalWeek' | 'totalMonth') => {
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };

  useEffect(() => {
    if (timesVisits && timesVisits?.times.length > 0) {
      mutate({
        userId: timesVisits.userId,
        date: dayjs().toISOString(),
        times: timesVisits.times,
      }, {
        onSuccess: () => {
          toast('Success!', { type: 'success' });
        },
        onError: (error) => {
          toast(errorHandler(error), { type: 'error' });
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timesVisits]);

  useEffect(() => {
    const filters = {
      fieldBySort: fieldSort !== null ? fieldSort : undefined,
    };

    if (fieldSort !== undefined) {
      const paramsToUpdate = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          paramsToUpdate.set(key, value);
        }
      });
      setSearchParams(paramsToUpdate);
    }

    handleUpdateFilters(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSort]);

  if (!personnelList.length) {
    return null;
  }

  return (
    <div className={classNames(s.root, 'container')}>
      <TableContainer id='all-attendance-table' ref={ref} onScroll={onScroll} className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <InfiniteScroll
            scrollableTarget="all-attendance-table"
            next={handleFetchNextPage}
            hasMore={hasNextPage || false}
            loader={null}
            dataLength={dataLength}
          >
            <TableHead >
              <TableRow>
                <TableCell width='100%' className='table-head-cell'>СЕГОДНЯШНИЙ ДЕНЬ</TableCell>
                <TableCell style={{ minWidth: '240px' }} className='table-head-cell' >ТЕКУЩАЯ НЕДЕЛЯ</TableCell>
                <TableCell style={{ minWidth: '140px' }} className='table-head-cell' onClick={() => sortHandler('totalWeek')}>
                  <span className={s.tableCellItem}>
                    Часы нед
                    <ArrowBottomICO />
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: '140px' }} className='table-head-cell' onClick={() => sortHandler('totalMonth')}>
                  <span className={s.tableCellItem}>
                    Часы мес
                    <ArrowBottomICO />
                  </span>
                </TableCell>
                <TableCell className='table-head-cell'>НАСТРОИТЬ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {personnelList.map((row) => (
                <TableRow
                  key={row.timeWeek}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='table-body-cell' component="th" scope="row">
                    <WorkDayInfo
                      id={row.userId}
                      vacations={row.vacations}
                      workTimes={row.workTimes}
                      defaultTimeValue={row.visits}
                      handleChange={(data) => setTimesVisits({ userId: row.userId, times: data })}
                    />
                  </TableCell>
                  <TableCell className='table-body-cell' component="th" scope="row">
                    <div className={s.days}>
                      {
                        daysWork.map(({ id, day }) => {
                          const isVacationToday = row.vacations.some((vacation) =>
                            dayjs().isBetween(dayjs(vacation.startTime), dayjs(vacation.endTime), null, '[]'),
                          );

                          const isDayOff = isVacationToday
                            ? true
                            : row.workTimes.every((workTime) => workTime.dayOfWeek !== dayjs().day(id).format('dddd'));

                          return (
                            <span key={id} className={classNames(s.day, { [s.active]: !isDayOff })}>
                              {day}
                            </span>
                          );
                        })
                      }
                    </div>
                  </TableCell>
                  <TableCell className='table-body-cell' align="left">{Number(row.timeWeek).toFixed(1)}</TableCell>
                  <TableCell className='table-body-cell' align="left">{Number(row.timeMonth).toFixed(1)}</TableCell>
                  <TableCell className='table-body-cell'>
                    <Button className={s.buttonLink}
                      color='secondary'
                      onClick={() => navigate(PATH_PAGE.attendance.schedule(row.userId))}>
                      Настроить
                    </Button >
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </InfiniteScroll>
        </Table>
      </TableContainer>
    </div>
  );
});
