import { NavLink, Outlet } from 'react-router-dom';
import { sessionModel, useRoleUser } from '~entities/session';
import { NavigateButton } from '~features/navigate';
import { getHomeUrl } from '~shared/lib/react-router';
import HeartICO from '~shared/svg/heart-ico.svg';
import FingerprintICO from '~shared/svg/settings-ico.svg';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';


export function Header() {
  const { checkUserRole } = useRoleUser();

  const homeUrl = getHomeUrl({ checkUserRole });

  const statusLogo = () => {
    switch (true) {
      case checkUserRole('superAdmin'):
        return 'Super';

      case checkUserRole('patient'):
        return 'LOGO';

      default:
        return 'LOGO';
    }
  };
  return (
    <>
      <div className={s.header}>
        <NavLink className={s.headerLogo} to={homeUrl}>
          <span className={s.status}>
            {statusLogo()}
          </span>
          <div className={s.ico}>
            <HeartICO />
          </div>
        </NavLink>

        <nav className={s.navbar}>
          <NavigateButton />

          <NavLink className={s.navLink} to="#">
            <FingerprintICO />
            <span className={s.name}>
              Настройки
            </span>
          </NavLink>
        </nav>
        <Button onClick={() => sessionModel.logout()}>Вийти</Button>
      </div>
      <Outlet />
    </>
  );
}
