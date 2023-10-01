import { useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AllClinic, SelectClinic } from '~widgets/super-admin/';

export function AllClinics() {
  const params = useParams();

  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList rootUrl={PATH_PAGE.allClinic} selectId={params.id} />
        <div className='container'>
          {
            params.id ? <SelectClinic /> : <AllClinic />
          }
        </div>
      </div>
    </div>
  );
}
