import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';


export type DataTable = {
  id: number,
  createdAt: string,
  link: string,
};

export function createData(
  { id, createdAt, link }: DataTable,
) {
  return { id, createdAt, link };
}

type Props = {
  applicationsList: DataTable[]
};

export function ClinicApplications({ applicationsList }: Props) {
  const navigaete = useNavigate();

  return (
    <div className={classNames(s.root, 'container')}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead  >
            <TableRow className={s.tableHead} >
              <TableCell sx={{ width: 200 }} className='table-head-cell'>
                <span className='d-flex'>
                  ДАТА ПОДАЧИ
                  <button type='button' onClick={() => false}> <ArrowBottomICO /> </button>
                </span>
              </TableCell>
              <TableCell sx={{ minWidth: 150 }} className='table-head-cell' />
            </TableRow>
          </TableHead>
          <TableBody>
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
        </Table>
      </TableContainer>
    </div>
  );
}
