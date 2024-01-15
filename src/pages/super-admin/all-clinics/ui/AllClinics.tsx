import { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SelectClinic, superAdminApi } from '~entities/super-admin';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { dataLength, filterObject } from '~shared/utils/helpers';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AllClinicTable, selectClinic } from '~widgets/super-admin/';
import { generateClinicList, generateSidebarItemList } from '../lib/utils';

type Params = {
  clinicId?: string
};

export function AllClinics() {

  const params = useParams<Params>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, fetchNextPage, updateQueryParameters, hasNextPage } = superAdminApi.useListOfUsersInfinity(
    {
      status: 'approval',
      fieldSort: searchParams.get('fieldSort'),
    },
  );
  const [filters, setFilters] = useState<Partial<superAdminApi.ListOfUsersQuery> | null>(null);

  const block1Ref = useRef<HTMLInputElement>(null);
  const block2Ref = useRef<HTMLInputElement>(null);

  const sidebarItemList = useMemo(() => generateSidebarItemList(data), [data]);
  const clinicList = useMemo(() => generateClinicList(data), [data]);
  const selectedClinic = selectClinic(data, Number(params.clinicId));

  useEffect(() => {
    const newQuery = filters ? filterObject(filters) : {};
    updateQueryParameters({ ...newQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    handleScroll(block1Ref, block2Ref)();
  }, [params]);

  return (
    (<div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList
          ref={block1Ref}
          items={sidebarItemList}
          selectId={params?.clinicId}
          onScroll={handleScroll(block1Ref, block2Ref)}
        >
          <Search isSearch filters='Все категории' handleChange={(value) => {
            setFilters(prev => ({ ...prev, filter: value }));
          }}
          />
        </SidebarItemList>
        <div >
          {
            !params.clinicId
              ? <AllClinicTable
                ref={block2Ref}
                clinicList={clinicList}
                hasNextPage={hasNextPage}
                handleFetchNextPage={fetchNextPage}
                handleUpdateFilters={(filter) => {
                  setFilters(prev => ({ ...prev, ...filter }));
                }}
                dataLength={dataLength(data)}
                onScroll={handleScroll(block2Ref, block1Ref)}
              />
              : <SelectClinic selectClinic={selectedClinic} />
          }
        </div>
        <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.superAdmin.addClinic)}>
          <AiOutlinePlusCircle />
          Добавить клинику
        </Button>
      </div>
    </div>)
  );
}
