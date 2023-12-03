import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
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

type ClinicApplicationsProps = {
  applicationsList: DataTable[]
  onScroll: () => void
};


export const ClinicApplications = React.forwardRef<HTMLDivElement, ClinicApplicationsProps>((props, ref) => {
  const navigaete = useNavigate();
  const [fieldSort, setFieldSort] = useState<string | null>();

  const { applicationsList, onScroll } = props;


  const sortHandler = (sortKey: 'createdAt') => {
    setFieldSort(prev => prev === sortKey ? null : sortKey);
  };


  const handleNext = () => {
    // handleFetchNextPage({ pageParam: { fieldSort } });
  };

  useEffect(() => {
    // handleUpdateFilters({ fieldSort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSort]);

  return (
    <div id="all-clinic-applications" className={classNames(s.root, 'container')} ref={ref} onScroll={onScroll}>
      <TableContainer className='table-container' component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <InfiniteScroll
            scrollableTarget="all-clinic-applications"
            next={handleNext}
            hasMore={false} // hasNextPage ||
            loader={<div>Loading...</div>}
            dataLength={2} // dataLength
          >
            <TableHead  >
              <TableRow className={s.tableHead} >
                <TableCell sx={{ width: 200 }} className='table-head-cell'>
                  <span className='d-flex'>
                    ДАТА ПОДАЧИ
                    <button type='button' onClick={() => sortHandler('createdAt')}> <ArrowBottomICO /> </button>
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
          </InfiniteScroll>

        </Table>
      </TableContainer>
    </div>
  );
});
