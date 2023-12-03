import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { superAdminApi } from '~entities/super-admin';
import { UserEntityDto } from '~shared/api/realworld';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

export type DataTable = {
  id: number,
  createdAt: string,
  link: string,
};

type ClinicApplicationsProps = {
  applicationsList: DataTable[]
  hasNextPage: boolean | undefined
  dataLength: number
  handleFetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<UserEntityDto[]>>
  handleUpdateFilters: (newQuery: Partial<superAdminApi.ListOfUsersQuery>) => void
  onScroll: () => void
};

export const ClinicApplications = React.forwardRef<HTMLDivElement, ClinicApplicationsProps>((props, ref) => {
  const navigaete = useNavigate();
  const [fieldSort, setFieldSort] = useState<string | null>();

  const { applicationsList, hasNextPage, dataLength, handleUpdateFilters, handleFetchNextPage, onScroll } = props;

  const sortHandler = (sortKey: 'createdAt') => {
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };

  useEffect(() => {
    handleUpdateFilters({ fieldSort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSort]);

  return (
    <div id="all-clinic-applications" className={classNames(s.root, 'container')} ref={ref} onScroll={onScroll}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <InfiniteScroll
            scrollableTarget="all-clinic-applications"
            next={handleFetchNextPage}
            hasMore={hasNextPage || false}
            loader={<div>Loading...</div>}
            dataLength={dataLength}
          >
            <TableHead  >
              <TableRow className={s.tableHead} >
                <TableCell sx={{ width: 300 }} className='table-head-cell'>
                  <span className='d-flex'>
                    ДАТА ПОДАЧИ
                    <button type='button' onClick={() => sortHandler('createdAt')}> <ArrowBottomICO /> </button>
                  </span>
                </TableCell>
                <TableCell sx={{ width: '70%' }} className='table-head-cell' />
              </TableRow>
            </TableHead>
            <TableBody>
              {!applicationsList.length ? 'List empty' : null}
              {applicationsList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={s.tableBody}
                >
                  <TableCell className='table-body-cell' component="th" scope="row">
                    {row.createdAt}
                  </TableCell>
                  <TableCell className='table-body-cell' component="th" scope="row">
                    <Button className={s.buttonLink} color='secondary' onClick={() =>
                      navigaete(row.link)}>Подробнее</Button>
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
