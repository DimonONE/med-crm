import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { superAdminApi } from '~entities/super-admin';
import { SearchPersonnel } from '~features/personnel';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AllClinicTable, SelectClinic } from '~widgets/super-admin/';

export function AllClinics() {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = superAdminApi.useListOfUsers();
  console.log('data', data);

  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 1' },
  ];


  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList items={items} selectId={params.id}>
          <SearchPersonnel />
        </SidebarItemList>
        <div className='container'>
          {
            params.id ? <SelectClinic /> : <AllClinicTable />
          }
        </div>
        <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.superAdmin.addClinic)}>
          <AiOutlinePlusCircle />
          Добавить клинику
        </Button>
      </div>
    </div>
  );
}
