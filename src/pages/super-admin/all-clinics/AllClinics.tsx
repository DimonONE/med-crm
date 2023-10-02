import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AllClinic, SelectClinic } from '~widgets/super-admin/';

export function AllClinics() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList rootUrl={PATH_PAGE.allClinic} selectId={params.id} />
        <div className='container'>
          {
            params.id ? <SelectClinic /> : <AllClinic />
          }
        </div>
        <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.addClinic)}>
          <AiOutlinePlusCircle />
          Добавить клинику
        </Button>
      </div>
    </div>
  );
}
