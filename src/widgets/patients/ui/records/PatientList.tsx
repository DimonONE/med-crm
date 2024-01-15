import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { patientsApi } from '~entities/patients';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import s from './styles.module.scss';


export type CreatePatientListData = {
  id: string,
  createdAt: string,
  fullName: string,
  dateOfBirth: string,
  status: string,
  phone: string,
};

type PatientListProps = {
  patientList: CreatePatientListData[]
  hasNextPage: boolean | undefined
  dataLength: number
  onScroll: () => void
  handleFetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any>>
  handleUpdateFilters: (newQuery: Partial<patientsApi.QueryListOfUsers>) => void
};

export const PatientList = React.forwardRef<HTMLDivElement, PatientListProps>((props, ref) => {
  const [, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');

  const { patientList, dataLength, hasNextPage, handleUpdateFilters, handleFetchNextPage, onScroll } = props;

  const sortHandler = (sortKey: 'sortBy' | 'reminder') => {
    if (sortKey === 'sortBy') {
      setSortBy(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    }
  };

  useEffect(() => {
    const filters = { sortBy };

    const paramsToUpdate = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        paramsToUpdate.set(key, value);
      }
    });
    setSearchParams(paramsToUpdate);

    handleUpdateFilters(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  if (!patientList.length) {
    return null;
  }

  return (
    <div id='all-patient-table' ref={ref} className={classNames(s.root, 'container')} onScroll={onScroll}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <InfiniteScroll
            scrollableTarget="all-patient-table"
            next={handleFetchNextPage}
            hasMore={hasNextPage || false}
            loader={null}
            dataLength={dataLength}
          >
            <TableHead >
              <TableRow>
                <TableCell width='auto' sx={{ minWidth: 180 }} className='table-head-cell'
                  onClick={() => sortHandler('sortBy')}>
                  <span className={s.tableCellItem}>
                    ДАТА РОЖ.
                    <ArrowBottomICO />
                  </span>
                </TableCell>
                <TableCell width='auto' sx={{ minWidth: 360 }} className='table-head-cell'>СТАТУС И ДАТА ЗАПИСИ</TableCell>
                <TableCell width='auto' sx={{ minWidth: 180 }} className='table-head-cell'>ТЕЛЕФОН</TableCell>
                <TableCell width='100%' className='table-head-cell'
                  onClick={() => sortHandler('reminder')}>
                  <span className={s.tableCellItem}>
                    НАПОМИНАНИЕ
                    <ArrowBottomICO />
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {patientList.map((row) => (
                <TableRow
                  key={row.createdAt}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='table-body-cell' component="th" scope="row">
                    {dayjs(row.createdAt).format('DD.MM.YYYY')}
                  </TableCell>
                  <TableCell className='table-body-cell' component="th" scope="row">
                    <div className={s.statusInfo}>
                      <div className={classNames(s.status, { [s.cancel]: row.status !== 'active' })}>{
                        row.status === 'active'
                          ? 'Запись завершена'
                          : 'Запись отменена'
                      }</div>
                      <div className={s.date}>{dayjs(row.createdAt).format('DD.MM.YYYY dd HH:mm')}</div>
                      <div className={s.name}>{row.fullName}</div>
                    </div>
                  </TableCell>
                  <TableCell className='table-body-cell'>{row.phone}</TableCell>
                  <TableCell className='table-body-cell'>{ }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </InfiniteScroll>
        </Table>
      </TableContainer>
    </div >
  );
});
