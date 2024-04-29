import { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { attendanceApi } from '~entities/staffAttendance';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { dataLength, filterObject } from '~shared/utils/helpers';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AttendanceTable } from '~widgets/staff-attendance';
import { generateAttendanceList, generateSidebarItemList } from './lib/utils';

type Params = {
  clinicId?: string
};

export function Attendance() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Partial<attendanceApi.QueryListOfAttendance> | null>(null);
  const { data, fetchNextPage, updateQueryParameters, hasNextPage } = attendanceApi.useListOfAttendanceInfinity(
    {
      fieldBySort: searchParams.get('fieldBySort') as string,
    },
  );

  const block1Ref = useRef<HTMLInputElement>(null);
  const block2Ref = useRef<HTMLInputElement>(null);
  const sidebarItemList = useMemo(() => generateSidebarItemList(data), [data]);
  const personnelList = useMemo(() => generateAttendanceList(data), [data]);

  useEffect(() => {
    const newQuery = filters ? filterObject(filters) : {};
    updateQueryParameters({ ...newQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    handleScroll(block1Ref, block2Ref)();
  }, [params]);

  return (
    <div className='d-flex'>
      <SidebarItemList
        ref={block1Ref}
        items={sidebarItemList}
        selectId={params?.clinicId}
        onScroll={handleScroll(block1Ref, block2Ref)}
      >
        <Search isSearch filters='Ф.И.О.' handleChange={(value) => {
          setFilters(prev => ({ ...prev, doctorName: value }));
        }}
        />
      </SidebarItemList>
      <div >
        <AttendanceTable
          ref={block2Ref}
          personnelList={personnelList}
          hasNextPage={hasNextPage}
          handleFetchNextPage={fetchNextPage}
          handleUpdateFilters={(filter) => {
            setFilters(prev => ({ ...prev, ...filter }));
          }}
          dataLength={dataLength(data)}
          onScroll={handleScroll(block2Ref, block1Ref)}
        />
      </div>
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.personnel.add)}>
        <AiOutlinePlusCircle />
        Добавить персонал
      </Button>
    </div>
  );
}
