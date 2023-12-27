import { ReactElement } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { daysWork } from '~entities/work-time';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { TimeScale, getTodayAtSpecificHour } from '~shared/ui/time-scale';
import s from './styles.module.scss';

function createData(
  today: ReactElement,
  week: ReactElement,
  timeWeek: string,
  timeMonth: string,
  settings: ReactElement,
) {
  return { today, week, timeWeek, timeMonth, settings };
}

export function AttendanceTable() {
  const navigate = useNavigate();


  const rows = [
    createData(
      <>
        {/* // */}
        {/* <WorkTime
          className={s.workTime}
          timesWork={timesWork}
          handleChange={() => false}
          handleDelete={() => false}
        // editTimes
        /> */}

      </>

      ,
      <div className={s.days}>
        {
          daysWork.map(({ id, day }) => (
            <span key={id} className={classNames(s.day, { [s.active]: id % 2 })}>
              {day}
            </span>
          ))
        }
      </div>,
      '178',
      '178',
      <Button className={s.buttonLink}
        color='secondary'
        onClick={() => navigate(PATH_PAGE.attendance.schedule('1'))}>
        Настроить
      </Button >),
  ];




  return (
    <div className={classNames(s.root, 'container')}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className='table-head-cell'>СЕГОДНЯШНИЙ ДЕНЬ</TableCell>
              <TableCell style={{ minWidth: '220px' }} className='table-head-cell'>ТЕКУЩАЯ НЕДЕЛЯ</TableCell>
              <TableCell style={{ minWidth: '120px' }} className='table-head-cell'>Часы нед</TableCell>
              <TableCell style={{ minWidth: '120px' }} className='table-head-cell'>Часы мес</TableCell>
              <TableCell width={140} className='table-head-cell'>НАСТРОИТЬ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {rows.map((row) => (
              <TableRow
                key={row.timeWeek}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.today}
                </TableCell>
                <TableCell className='table-body-cell' component="th" scope="row">
                  {row.week}
                </TableCell>
                <TableCell className='table-body-cell' align="left">{row.timeWeek}</TableCell>
                <TableCell className='table-body-cell' align="left">{row.timeMonth}</TableCell>
                <TableCell className='table-body-cell'>{row.settings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TimeScale startTime={getTodayAtSpecificHour(9)} endTime={getTodayAtSpecificHour(21)} />

    </div>
  );
}
