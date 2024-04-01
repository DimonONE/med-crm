import { useState } from 'react';
import { BackButton } from '~shared/ui/back-button';
import { MedInfo } from '~widgets/medical-informations';
import s from './styles.module.scss';


export function MedInfoPage() {
  const [backName, setBackName] = useState('Мед. карта');
  return (
    <div className={s.root}>
      <BackButton title={backName} />
      <MedInfo backName={name => setBackName(name as string)} />
    </div>
  );
}
