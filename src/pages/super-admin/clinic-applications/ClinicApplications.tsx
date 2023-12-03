import { useEffect, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useListOfUsers } from '~entities/super-admin';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { ClinicApplications, ViewClinicApplication } from '~widgets/super-admin/';
// eslint-disable-next-line no-restricted-imports
import { createData } from '~widgets/super-admin/ui/clinic-applications/ClinicApplications';


export function ClinicApplicationPage() {
  const params = useParams();
  const { data } = useListOfUsers({ status: 'pending' });

  const block1Ref = useRef<HTMLInputElement>(null);
  const block2Ref = useRef<HTMLInputElement>(null);

  const sidebarItemList = useMemo(() => data
    ? data.map((user) => user.clinic && ({
      id: user.clinic.id.toString(),
      title: user.clinic.name,
      subTitle: `Код клиники: ${user.clinic?.id}`,
      link: PATH_PAGE.superAdmin.selectApplications(user.clinic.id),
    })).filter(Boolean)
    : [], [data]);

  const clinicList = useMemo(() => data
    ? data.map((user) => user.clinic &&
      createData({
        id: user.clinic.id,
        createdAt: dayjs(user.clinic.createdAt).format('DD.MM.YYYY'),
        link: `${PATH_PAGE.superAdmin.selectApplications(user.clinic.id)}`,
      },
      )).filter(Boolean)
    : [], [data]);

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
            ? <ViewClinicApplication clinicList={data} clinicId={Number(params.clinicId)} />
            : <ClinicApplications
              ref={block2Ref}
              onScroll={handleScroll(block2Ref, block1Ref)}
              applicationsList={clinicList} />}
        </div>
      </div>
    </div>
  );
}
