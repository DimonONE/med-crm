import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { UserInfo } from '~widgets/patients';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import s from './styles.module.scss';

export function ViewingQuestionnairePage() {
  const navigate = useNavigate();
  const params = useParams();

  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 1' },
    { id: '2', title: 'Арноль Качер Шварценегерович', subTitle: 'Код клиники: 2' },
  ];

  return (
    <div className={s.root}>
      <div className='d-flex'>
        <SidebarItemList items={items} selectId={params.id} />
        <UserInfo />
      </div>
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.superAdmin.addClinic)}>
        <AiOutlinePlusCircle />
        Добавить клиента
      </Button>
    </div>
  );
}
