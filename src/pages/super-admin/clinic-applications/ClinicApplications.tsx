import { useParams } from 'react-router-dom';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { ClinicApplications, ViewClinicApplication } from '~widgets/super-admin/';

export function ClinicApplicationPage() {
  const params = useParams();

  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 1' },
    { id: '2', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 2' },
  ];

  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList items={items} selectId={params.id} />
        <div className='container'>
          {params.id ? <ViewClinicApplication /> : <ClinicApplications />}
        </div>
      </div>
    </div>
  );
}
