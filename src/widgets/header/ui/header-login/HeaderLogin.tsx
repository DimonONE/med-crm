import classNames from 'classnames';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import LogoBlue from '~shared/svg/logo-blue.svg';
import LogoWhite from '~shared/svg/logo-white.svg';
import s from './styles.module.scss';

export function HeaderLogin() {
  const { pathname } = useLocation();
  const isLoginPath = pathname === PATH_PAGE.login;

  return (<>
    <div className={classNames(s.header, { [s.white]: isLoginPath })}>
      <div className={s.container}>
        <NavLink className={s.navbarBrand} to={PATH_PAGE.root}>
          {isLoginPath ? 'HELLO' : 'WELCOME'}
        </NavLink>
        {isLoginPath ? <LogoBlue /> : <LogoWhite />}
      </div>
    </div>
    <Outlet />
  </>
  );
}
