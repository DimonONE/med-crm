import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { personnelApi, rolesPersonnelOptions } from '~entities/personnel';
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

type RoleFilter = {
  isOpen: boolean,
  value: string | null,
};

export const PersonnelList = React.forwardRef<HTMLDivElement, PersonnelListProps>((props, ref) => {
  const [, setSearchParams] = useSearchParams();
  const [fieldSort, setFieldSort] = useState<string | null | undefined>(undefined);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>({
    isOpen: false,
    value: null,
  });
  const { personnelList, dataLength, hasNextPage, handleUpdateFilters, handleFetchNextPage, onScroll } = props;

  const sortHandler = (sortKey: 'createdAt' | 'role') => {
    if (sortKey === 'role') {
      setRoleFilter(prev => ({ ...prev, isOpen: !prev.isOpen }));
      return;
    }
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };

  useEffect(() => {
    const filters = { role: roleFilter.value, fieldSort };

    if (filters.fieldSort !== undefined) {
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
  }, [fieldSort, roleFilter.value]);

  if (!personnelList.length) {
    return null;
  }

  return (
    <div className={classNames(s.root, 'container')} >
      <TableContainer id='all-personnel-table' ref={ref} onScroll={onScroll} className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <InfiniteScroll
            scrollableTarget="all-personnel-table"
            next={handleFetchNextPage}
            hasMore={hasNextPage || false}
            loader={null}
            dataLength={dataLength}
          >
            <TableHead >
              <TableRow >
                <TableCell width='auto' sx={{ minWidth: 180 }} className='table-head-cell'
                  onClick={() => sortHandler('createdAt')}>
                  <span className={s.tableCellItem}>
                    ДАТА РЕГ.
                    <ArrowBottomICO />
                  </span>
                </TableCell>
                <TableCell
                  width='auto'
                  sx={{ minWidth: 360 }}
                  className='table-head-cell'
                  onClick={() => sortHandler('role')} >
                  <span className={s.tableCellItem}>
                    ДОЛЖНОСТЬ
                    <ArrowBottomICO />
                    <div className={classNames(s.roles, { [s.active]: roleFilter.isOpen })}>
                      {
                        rolesPersonnelOptions.map(({ label, value: link }) => (
                          <option value={link}
                            className={s.optionRole}
                            onClick={(event) => {
                              setRoleFilter((prev) => ({
                                ...prev, value:
                                  'value' in event.target &&
                                    event.target.value !== rolesPersonnelOptions[0].value.toString()
                                    ? event.target.value as string
                                    : null,
                              }));
                            }}
                          >
                            {label}
                          </option>
                        ))
                      }
                    </div>
                  </span>
                </TableCell>
                <TableCell width='100%' className='table-head-cell'>ТЕЛЕФОН</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
    </div >
  );
});
