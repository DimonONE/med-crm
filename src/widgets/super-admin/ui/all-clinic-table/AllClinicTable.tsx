import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { superAdminApi } from '~entities/super-admin';
import { UserEntityDto } from '~shared/api/realworld';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import s from './styles.module.scss';

type ClinicRow = {
  id: string | number;
  createdAt: string;
  city: string;
  address: string;
  phone: string;
  fullName: string;
  dateOfBirth: string;
  status: boolean;
};

type AllClinicTableProps = {
  clinicList: ClinicRow[]
  hasNextPage: boolean | undefined
  dataLength: number
  onScroll: () => void
  handleFetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<UserEntityDto[]>>
  handleUpdateFilters: (newQuery: Partial<superAdminApi.ListOfUsersQuery>) => void
};

export const AllClinicTable = React.forwardRef<HTMLDivElement, AllClinicTableProps>((props, ref) => {
  const [, setSearchParams] = useSearchParams();
  const [fieldSort, setFieldSort] = useState<string | null | undefined>(undefined);
  const { clinicList, dataLength, hasNextPage, handleUpdateFilters, handleFetchNextPage, onScroll } = props;

  const sortHandler = (sortKey: 'createdAt' | 'country' | 'endPaidDate') => {
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };

  useEffect(() => {
    const filters = { fieldSort };

    if (filters.fieldSort !== undefined) {
      const paramsToUpdate = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          paramsToUpdate.set(key, value);
        }
      });
      setSearchParams(paramsToUpdate);
    }
    handleUpdateFilters({ fieldSort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSort]);

  if (!clinicList.length) {
    return null;
  }

  return (
    <div id="all-clinic-table" ref={ref} onScroll={onScroll} className={classNames(s.root, 'container')} >
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table" >
          <InfiniteScroll
            scrollableTarget="all-clinic-table"
            next={handleFetchNextPage}
            hasMore={hasNextPage || false}
            loader={<div>Loading...</div>}
            dataLength={dataLength}
          >
            <TableHead  >
              <TableRow className={s.tableHead} >
                <TableCell sx={{ minWidth: 150 }} className='table-head-cell'>
                  <span className='d-flex'>
                    ДАТА РЕГ.
                    <button type='button' onClick={() => sortHandler('createdAt')}> <ArrowBottomICO /> </button>
                  </span>
                </TableCell>
                <TableCell sx={{ minWidth: 150 }} className='table-head-cell'>
                  <span className='d-flex'>
                    ГОРОД
                    <button type='button' onClick={() => sortHandler('country')}> <ArrowBottomICO /> </button>
                  </span>
                </TableCell>
                <TableCell sx={{ minWidth: 220 }} className='table-head-cell'>АДРЕС</TableCell>
                <TableCell sx={{ minWidth: 220 }} className='table-head-cell'>ТЕЛЕФОН</TableCell>
                <TableCell sx={{ minWidth: 250 }} className='table-head-cell'>ГЛАВВРАЧ</TableCell>
                <TableCell sx={{ minWidth: 180 }} className='table-head-cell'>
                  <span className='d-flex'>
                    ТАРИФ
                    <button type='button' onClick={() => sortHandler('endPaidDate')}> <ArrowBottomICO /></button>
                  </span>
                </TableCell>
                <TableCell className='table-head-cell'>СТАТУС</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {
                clinicList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={s.tableBody}
                  >
                    <TableCell className='table-body-cell' component="th" scope="row">
                      {dayjs(row.createdAt).format('DD.MM.YYYY')}
                    </TableCell>
                    <TableCell className='table-body-cell' component="th" scope="row">
                      {row.city}
                    </TableCell>
                    <TableCell className='table-body-cell' component="th" scope="row">
                      {row.address}
                    </TableCell>
                    <TableCell className='table-body-cell' align="left">{row.phone}</TableCell>
                    <TableCell className='table-body-cell' align="left">{row.fullName}</TableCell>
                    <TableCell className='table-body-cell'>{row.dateOfBirth}</TableCell>
                    <TableCell className={classNames('table-body-cell', s.status, { [s.error]: !row.status })}>
                      {row.status ? 'Разблокировать' : 'Заблокировать'}
                    </TableCell>
                  </TableRow>
                ),
                )
              }
            </TableBody>
          </InfiniteScroll>
        </Table>
      </TableContainer>
    </div>
  );
});
