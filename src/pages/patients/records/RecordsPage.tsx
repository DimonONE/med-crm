import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchPersonnel } from '~features/personnel';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Records } from '~widgets/patients';
import { SidebarItemList } from '~widgets/sidebar-items-list';

export function RecordsPage() {
  const navigate = useNavigate();
  const params = useParams();

  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 1' },
    { id: '2', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 2' },
  ];

  return (
    <div>
      <div className='d-flex'>
        <SidebarItemList items={items} selectId={params.id} >
          <SearchPersonnel />
        </SidebarItemList>
        <Records />
      </div>
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.patients.add)}>
        <AiOutlinePlusCircle />
        Добавить пациента
      </Button>
    </div>
  );
}
