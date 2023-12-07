import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { personnelApi } from '~entities/personnel';
import { Api } from '~shared/api/realworld';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import s from './styles.module.scss';

export type CreatePersonnelListData = {
  id: string,
  createdAt: string,
  role: Api.RoleEntityDto,
  phone: string,
};

type PersonnelListProps = {
  personnelList: CreatePersonnelListData[]
  hasNextPage: boolean | undefined
  dataLength: number
  onScroll: () => void
  handleFetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any>>
  handleUpdateFilters: (newQuery: Partial<personnelApi.QueryListOfUsers>) => void
};

export const PersonnelList = React.forwardRef<HTMLDivElement, PersonnelListProps>((props, ref) => {
  const [fieldSort, setFieldSort] = useState<string | null>();
  const { personnelList, dataLength, hasNextPage, handleUpdateFilters, handleFetchNextPage, onScroll } = props;

  const sortHandler = (sortKey: 'createdAt' | 'role') => {
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };

  useEffect(() => {
    handleUpdateFilters({ fieldSort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSort]);

  if (!personnelList.length) {
    return null;
  }

  return (
    <div ref={ref} className={classNames(s.root, 'container')} onScroll={onScroll}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <InfiniteScroll
            scrollableTarget="all-clinic-table"
            next={handleFetchNextPage}
            hasMore={hasNextPage || false}
            loader={<div>Loading...</div>}
            dataLength={dataLength}
          >
            <TableHead >
              <TableRow >
                <TableCell width='auto' sx={{ minWidth: 220 }} className='table-head-cell' onClick={() => sortHandler('createdAt')}>
                  <span className='d-flex '>
                    ДАТА РЕГ.
                    <button type='button'><ArrowBottomICO /> </button>
                  </span>
                </TableCell>
                <TableCell width='auto' sx={{ minWidth: 220 }} className='table-head-cell' onClick={() => sortHandler('role')}>
                  <span className='d-flex'>
                    ДОЛЖНОСТЬ
                    <button type='button'><ArrowBottomICO /> </button>
                  </span>
                </TableCell>
                <TableCell width='100%' className='table-head-cell'>ТЕЛЕФОН</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {personnelList.map((row) => (
                <TableRow
                  key={row.createdAt}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='table-body-cell' component="th" scope="row">
                    {dayjs(row.createdAt).format('DD.MM.YYYY')}
                  </TableCell>
                  <TableCell className={classNames('table-body-cell', s.position)} component="th" scope="row">
                    {row.role.name}
                  </TableCell>
                  <TableCell className='table-body-cell' component="th" scope="row">
                    {row.phone}
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
