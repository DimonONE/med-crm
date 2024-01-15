import { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { patientsApi, usePatientsListInfinity } from '~entities/patients';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { dataLength, filterObject } from '~shared/utils/helpers';
import { PatientInfo, PatientList } from '~widgets/patients';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { generatePatientList, generateSidebarItemList } from './lib/utils';

dayjs.locale('ru');

type Params = {
  patientId?: string
};

export function RecordsPage() {
  const navigate = useNavigate();
  const params = useParams<Params>();
  const [filters, setFilters] = useState<Partial<patientsApi.QueryListOfUsers> | null>(null);
  const { data, fetchNextPage, updateQueryParameters, hasNextPage } = usePatientsListInfinity();

  const block1Ref = useRef<HTMLInputElement>(null);
  const block2Ref = useRef<HTMLInputElement>(null);

  const sidebarItemList = useMemo(() => generateSidebarItemList(data), [data]);
  const patientList = useMemo(() => generatePatientList(data), [data]);

  useEffect(() => {
    const newQuery = filters ? filterObject(filters) : {};
    updateQueryParameters({ ...newQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    handleScroll(block1Ref, block2Ref)();
  }, [params]);

  return (
    <div>
      <div className='d-flex'>
        <SidebarItemList
          ref={block1Ref}
          items={sidebarItemList}
          selectId={params?.patientId}
          onScroll={handleScroll(block1Ref, block2Ref)}
        >
          <Search isSearch filters='Ф.И.О.' handleChange={(value) => {
            setFilters(prev => ({ ...prev, filter: value }));
          }}
          />
        </SidebarItemList>
        <div>
          {params.patientId
            ? <PatientInfo patientId={params.patientId} />
            : (
              <PatientList
                ref={block2Ref}
                patientList={patientList}
                hasNextPage={hasNextPage}
                handleFetchNextPage={fetchNextPage}
                handleUpdateFilters={(filter) => {
                  setFilters(prev => ({ ...prev, ...filter }));
                }}
                dataLength={dataLength(data)}
                onScroll={handleScroll(block2Ref, block1Ref)}
              />
            )}
        </div>
      </div>
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.patients.add)}>
        <AiOutlinePlusCircle />
        Добавить пациента
      </Button>
    </div>
  );
}
