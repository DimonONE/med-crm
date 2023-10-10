
import { NavLink } from 'react-router-dom';
import ClientsICO from '../../svg/clients-ico.svg';
import OfficesICO from '../../svg/offices-ico.svg';
import ServicesICO from '../../svg/services-ico.svg';
import SettingsICO from '../../svg/settings-ico.svg';
import s from './styles.module.scss';

export function Widgets() {
  return (
    <div className={s.root}>
      <NavLink to='/' className={s.card}>
        <div className={s.icon}>
          <ServicesICO />
        </div>

        Услуги
      </NavLink>
      <NavLink to='/' className={s.card}>
        <div className={s.icon}>

          <ClientsICO />
        </div>

        Клиенты
      </NavLink>
      <NavLink to='/' className={s.card}>
        <div className={s.icon}>
          <OfficesICO />
        </div>

        Кабинеты врачей
      </NavLink>
      <NavLink to='/' className={s.card}>
        <div className={s.icon}>
          <SettingsICO />
        </div>

        Настройки
      </NavLink>
    </div>
  );
}
