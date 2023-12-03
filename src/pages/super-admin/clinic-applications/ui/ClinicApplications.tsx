import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ViewClinicApplication, superAdminApi } from '~entities/super-admin';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { ClinicApplications, dataLength, filterObject, selectClinic } from '~widgets/super-admin/';
import { generateClinicList, generateSidebarItemList } from '../lib/utils';

export function ClinicApplicationPage() {
  const params = useParams();
  const { data, hasNextPage, refetch, updateQueryParameters, fetchNextPage } = superAdminApi.useListOfUsersInfinity({ status: 'pending' });
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
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList
          ref={block1Ref}
          items={sidebarItemList} selectId={params.clinicId}
        >
          <Search filters='Заявки' />
        </SidebarItemList>
        <div className='container'>
          {params.clinicId
            ? <ViewClinicApplication selectClinic={selectedClinic} refetch={refetch} />
            : <ClinicApplications
              ref={block2Ref}
              hasNextPage={hasNextPage}
              handleFetchNextPage={fetchNextPage}
              handleUpdateFilters={(filter) => {
                setFilters(prev => ({ ...prev, ...filter }));
              }}
              dataLength={dataLength(data)}
              onScroll={handleScroll(block2Ref, block1Ref)}
              applicationsList={clinicList} />}
        </div>
      </div>
    </div>
  );
}
