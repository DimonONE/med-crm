import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { MedInfo } from '~widgets/medical-informations';
import s from './styles.module.scss';


export function MedInfoPage() {

  return (
    <div className={s.root}>
      <BackButton title="namePage" link={PATH_PAGE.root} />
      <MedInfo />
    </div>
  );
}
