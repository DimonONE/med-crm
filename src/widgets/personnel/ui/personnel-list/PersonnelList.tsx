import { ReactElement } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

function createData(
  date: string,
  position: string,
  phone: string,
  buttonInfo: ReactElement,
) {
  return { date, position, phone, buttonInfo };
}

export function PersonnelList() {
  const navigate = useNavigate();


  const rows = [
    createData(
      '03.02.2021',
      'Медсестра',
      '+389658256715',
      <Button className={s.buttonLink}
        color='secondary'
        onClick={() => navigate(`${PATH_PAGE.superAdmin.clinicApplications}/1`)
        }>
        Подробнее
      </Button>),
    createData(
      '03.02.2021',
      'Медсестра',
      '+389658256715',
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
              <TableCell width='auto' className='table-head-cell'>ДОЛЖНОСТЬ</TableCell>
              <TableCell width={270} className='table-head-cell'>ТЕЛЕФОН</TableCell>
              <TableCell width='auto' className='table-head-cell' />
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
                <TableCell className={classNames('table-body-cell', s.position)} component="th" scope="row">
                  {row.position}
                </TableCell>
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.phone}
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
