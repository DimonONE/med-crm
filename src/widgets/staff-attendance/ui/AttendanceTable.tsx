import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { attendanceApi } from '~entities/staffAttendance';
import { daysWork } from '~entities/work-time';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { TimeScale, getTodayAtSpecificHour } from '~shared/ui/time-scale';
import s from './styles.module.scss';

export type CreateAttendanceListData = {
  today: any,
  week: any,
  timeWeek: string,
  timeMonth: string,
  settingsId: string,
};

type AttendanceListProps = {
  personnelList: CreateAttendanceListData[]
  hasNextPage: boolean | undefined
  dataLength: number
  onScroll: () => void
  handleFetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any>>
  handleUpdateFilters: (newQuery: Partial<attendanceApi.QueryListOfAttendance>) => void
};

export const AttendanceTable = React.forwardRef<HTMLDivElement, AttendanceListProps>((props, ref) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [fieldSort, setFieldSort] = useState<string | null | undefined>(undefined);
  const { personnelList, dataLength, hasNextPage, handleUpdateFilters, handleFetchNextPage, onScroll } = props;

  const sortHandler = (sortKey: 'timeWeek' | 'timeMonth') => {
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };

  useEffect(() => {
    const filters = {
      doctorName: '',
      sortBy: undefined,
      fieldBySort: '',
      date: '',
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
                <TableCell style={{ minWidth: '220px' }} className='table-head-cell'>ТЕКУЩАЯ НЕДЕЛЯ</TableCell>
                <TableCell style={{ minWidth: '120px' }} className='table-head-cell' onClick={() => sortHandler('timeWeek')}>Часы нед</TableCell>
                <TableCell style={{ minWidth: '120px' }} className='table-head-cell'>Часы мес</TableCell>
                <TableCell width='100%' className='table-head-cell'>НАСТРОИТЬ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {personnelList.map((row) => (
                <TableRow
                  key={row.timeWeek}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='table-body-cell' component="th" scope="row">
                    <TimeScale startTime={getTodayAtSpecificHour(9)} endTime={getTodayAtSpecificHour(20)} />

                    {row.today}
                  </TableCell>
                  <TableCell className='table-body-cell' component="th" scope="row">
                    <div className={s.days}>
                      {
                        daysWork.map(({ id, day }) => (
                          <span key={id} className={classNames(s.day, { [s.active]: id % 2 })}>
                            {day}
                          </span>
                        ))
                      }
                    </div>
                    {row.week}
                  </TableCell>
                  <TableCell className='table-body-cell' align="left">{row.timeWeek}</TableCell>
                  <TableCell className='table-body-cell' align="left">{row.timeMonth}</TableCell>
                  <TableCell className='table-body-cell'>
                    <Button className={s.buttonLink}
                      color='secondary'
                      onClick={() => navigate(PATH_PAGE.attendance.schedule(row.settingsId))}>
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
