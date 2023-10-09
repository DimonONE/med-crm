
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

export function ClientInfo() {

  return (
    <div className={s.root}>
      <div className='d-flex'>
        {/* <BackButton link='ss'>test</BackButton> */}
      </div>
      <div>
        <div>
          <Button color='primary-reverse'>
            Записать
          </Button>
        </div>
      </div>
    </div>
  );
}
