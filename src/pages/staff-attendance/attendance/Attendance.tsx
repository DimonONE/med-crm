import { useParams } from 'react-router-dom';
import { Search } from '~shared/ui/search';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AttendanceTable } from '~widgets/staff-attendance';
import s from './styles.module.scss';

export function Attendance() {
  const params = useParams();


  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 'Стоматолог' },
    { id: '2', title: 'Винницкий Богдан Станиславович', subTitle: 'Стоматолог' },
    { id: '3', title: 'Винницкий Богдан Станиславович', subTitle: 'Стоматолог' },
  ];

  return (
    <div className={s.root}>
      <SidebarItemList items={items} selectId={params.id} >
        <Search filters='Ф.И.О.' />
      </SidebarItemList>
      <AttendanceTable />
    </div>
  );
}
