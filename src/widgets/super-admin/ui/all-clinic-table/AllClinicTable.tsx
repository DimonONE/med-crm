import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import s from './styles.module.scss';


function createData(
  date: string,
  city: string,
  street: string,
  phone: string,
  fullName: string,
  dateOff: string,
  status: string,
) {
  return { date, city, street, phone, fullName, dateOff, status };
}

export function AllClinicTable() {
  const rows = [
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
    createData(
      '03.02.2021',
      'Сывтывкар',
      'ул.Пушкина 23\\77',
      '+7 095 518 58 36',
      'Осипенко Владимир Николаевич',
      'до 12.12.2023',
      'Оплачено',
    ),
  ];

  return (
    <div className={classNames(s.root, 'container')}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead  >
            <TableRow className={s.tableHead} >
              <TableCell sx={{ minWidth: 150 }} className='table-head-cell'>
                <span className='d-flex'>
                  ДАТА РЕГ.
                  <button type='button'> <ArrowBottomICO /> </button>
                </span>
              </TableCell>
              <TableCell sx={{ minWidth: 150 }} className='table-head-cell'>
                <span className='d-flex'>
                  ГОРОД
                  <button type='button'> <ArrowBottomICO /> </button>
                </span>
              </TableCell>
              <TableCell sx={{ minWidth: 220 }} className='table-head-cell'>АДРЕС</TableCell>
              <TableCell sx={{ minWidth: 220 }} className='table-head-cell'>ТЕЛЕФОН</TableCell>
              <TableCell sx={{ minWidth: 250 }} className='table-head-cell'>ГЛАВВРАЧ</TableCell>
              <TableCell sx={{ minWidth: 180 }} className='table-head-cell'>
                <span className='d-flex'>
                  ТАРИФ
                  <button type='button'> <ArrowBottomICO /></button>
                </span>
              </TableCell>
              <TableCell className='table-head-cell'>СТАТУС</TableCell>
            </TableRow>
          </TableHead>
          <TableBody  >
            {rows.map((row) => (
              <TableRow
                key={row.date}
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
                <TableCell className='table-body-cell'>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
