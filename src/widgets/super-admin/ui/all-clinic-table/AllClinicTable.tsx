import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { superAdminApi } from '~entities/super-admin';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import s from './styles.module.scss';

type DataTable = {
  id: string | number,
  date: string,
  city: string,
  street: string,
  phone: string,
  fullName: string,
  dateOff: string,
  status: boolean,
};

type Props = {
  tableList: DataTable[]
  updateQueryParameters: (newQuery: Partial<superAdminApi.ListOfUsersQuery>) => void
};

export function AllClinicTable({ tableList, updateQueryParameters }: Props) {
  const [fieldSort, setFieldSort] = useState<string | null>();

  const sortHandler = (sortKey: 'createdAt' | 'country' | 'endPaidDate') => {
    setFieldSort(prev => prev === sortKey ? '' : sortKey);
  };

  useEffect(() => {
    if (fieldSort || fieldSort === '') {
      updateQueryParameters({ fieldSort });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSort]);


  if (!tableList.length) {
    return null;
  }

  return (
    <div className={classNames(s.root, 'container')}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
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
          <TableBody  >
            {tableList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={s.tableBody}
              >
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.city}
                </TableCell>
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.street}
                </TableCell>
                <TableCell className='table-body-cell' align="left">{row.phone}</TableCell>
                <TableCell className='table-body-cell' align="left">{row.fullName}</TableCell>
                <TableCell className='table-body-cell'>{row.dateOff}</TableCell>
                <TableCell className={classNames('table-body-cell', s.status, { [s.error]: !row.status })}>
                  {row.status ? 'Разблокировать' : 'Заблокировать'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
