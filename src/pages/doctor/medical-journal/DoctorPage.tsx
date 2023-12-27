import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { AppointmentSchedule, ClientInfo, TimeWorks, WriteDown } from '~widgets/doctor';
import s from './styles.module.scss';


type Params = {
  patientId: string | undefined
};

export function DoctorPage() {
  const navigate = useNavigate();
  const params = useParams<Params>();
  const location = useLocation();

  return (
    <div className={s.root}>
      <TimeWorks />
      <AppointmentSchedule />
      {
        location.pathname === PATH_PAGE.doctor.record(params.patientId)
          ? <WriteDown patientId={params.patientId!} /> : <ClientInfo />
      }
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.superAdmin.addClinic)}>
        <AiOutlinePlusCircle />
        Добавить запись
      </Button>
    </div>
  );
}
