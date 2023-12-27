import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { sessionModel, useRoleUser } from '~entities/session';
import { NavigateButton } from '~features/navigate';
import { PATH_PAGE } from '~shared/lib/react-router';
import HeartICO from '~shared/svg/heart-ico.svg';
import FingerprintICO from '~shared/svg/settings-ico.svg';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

export function Header() {
  const navigate = useNavigate();
  const { checkUserRole } = useRoleUser();


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
        <NavLink className={s.headerLogo} to={PATH_PAGE.root}>
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
        <Button onClick={() => {
          sessionModel.logout();
          navigate(PATH_PAGE.login);
        }}>Выйти</Button>
      </div>
      <Outlet />
    </>
  );
}
