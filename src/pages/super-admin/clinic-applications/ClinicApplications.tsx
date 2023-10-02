import { useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { ClinicApplications, ViewClinicApplication } from '~widgets/super-admin/';

export function ClinicApplicationPage() {
  const params = useParams();

  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList rootUrl={PATH_PAGE.clinicApplications} selectId={params.id} />
        <div className='container'>
          {params.id ? <ViewClinicApplication /> : <ClinicApplications />}
        </div>
      </div>
    </div>
  );
}
