import { NavLink, Outlet } from 'react-router-dom';
import { NavigateButton } from '~entities/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import HeartICO from '~shared/svg/heart-ico.svg';
import FingerprintICO from '~shared/svg/settings-ico.svg';
import s from './styles.module.scss';

export function Header() {
  const statusLogo = 'Super';

  return (
    <>
      <div className={s.header}>
        <NavLink className={s.headerLogo} to={PATH_PAGE.root}>
          <span className={s.status}>
            {statusLogo}
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
      </div>
      <Outlet />
    </>
  );
}
