import { useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { ClinicApplications, ViewClinicApplication } from '~widgets/super-admin/';

export function ClinicApplicationPage() {
  const params = useParams();

  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 12 },
    { id: '2', title: 'test', subTitle: 12 },
    { id: '3', title: 'test', subTitle: 12 },
  ];

  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList items={items} rootUrl={PATH_PAGE.superAdmin.clinicApplications} selectId={params.id} />
        <div className='container'>
          {params.id ? <ViewClinicApplication /> : <ClinicApplications />}
        </div>
      </div>
    </div>
  );
}
