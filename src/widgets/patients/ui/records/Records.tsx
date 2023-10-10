import { ReactElement } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

function createData(
  date: string,
  status: ReactElement,
  buttonInfo: ReactElement,
) {
  return { date, status, buttonInfo };
}

export function Records() {
  const navigate = useNavigate();


  const rows = [
    createData(
      '03.02.2021',
      <div className={s.statusInfo}>
        <div className={s.status}>Запись завершена</div>
        <div className={s.date}>12.11.2023 Пт 13:50</div>
        <div className={s.name}>Лопес Дженифер Рональдовна</div>
      </div>,
      <Button className={s.buttonLink}
        color='secondary'
        onClick={() => navigate(`${PATH_PAGE.superAdmin.clinicApplications}/1`)}>
        Подробнее
      </Button>),
    createData(
      '03.02.2021',
      <div className={s.statusInfo}>
        <div className={classNames(s.status, { [s.cancel]: true })}>Запись отменена</div>
        <div className={s.date}>12.11.2023 Пт 13:50</div>
        <div className={s.name}>Лопес Дженифер Рональдовна</div>
      </div>,
      <Button className={s.buttonLink}
        color='secondary'
        onClick={() => navigate(`${PATH_PAGE.superAdmin.clinicApplications}/1`)}>
        Подробнее
      </Button>),
  ];

  return (
    <div className={classNames(s.root, 'container')}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className='table-head-cell'>ДАТА РЕГ.</TableCell>
              <TableCell width='auto' className='table-head-cell'>СТАТУС И ДАТА ЗАПИСИ</TableCell>
              <TableCell width={270} className='table-head-cell'>ТАБЛИЦА ПРИЕМА</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell className='table-body-cell' align="right">{row.buttonInfo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
