import LogoBlue from '~shared/svg/logo-blue.svg';
import { Sidebar } from '~shared/ui/sidebar';
import { Widgets } from '~widgets/patients';
import s from './styles.module.scss';

export function PatientsPage() {
  return (
    <div className={s.root}>
      <Sidebar className={s.sidebar}>
        <div className={s.sidebarContent}>
          <div className={s.logo}>
            <LogoBlue />
          </div>
          <div className={s.label}>
            Стоматологическая клиника
          </div>
        </div>
      </Sidebar>

      <Widgets />
    </div>
  );
}
