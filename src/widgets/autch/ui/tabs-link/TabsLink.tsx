import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import s from './styles.module.scss';

export function TabsLink() {
  const { pathname } = useLocation();
  const isLoginPath = pathname === PATH_PAGE.login;

  return (
    <div className={s.tabs}>
      <NavLink className={classNames(s.tab, { [s.active]: isLoginPath })} to={PATH_PAGE.login}>
        Войти
      </NavLink>
      <NavLink className={classNames(s.tab, { [s.active]: !isLoginPath })} to={PATH_PAGE.register}>
        Подать заявку
      </NavLink>
    </div>
  );
}
