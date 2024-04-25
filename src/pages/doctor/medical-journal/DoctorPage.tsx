import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '~entities/session';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { AppointmentSchedule } from '~widgets/doctor';
import { PatientInfo } from '~widgets/patients';
import s from './styles.module.scss';


type Params = {
  patientId: string | undefined
};

export function DoctorPage() {
  const navigate = useNavigate();
  const params = useParams<Params>();
  const userInfo = useCurrentUser();

  return (
    <div className={s.root}>
      {userInfo ? <AppointmentSchedule userId={userInfo.id} patientId={params.patientId} /> : null}
      {params.patientId
        ? <div className={s.patientInfo}>
          <PatientInfo patientId={params.patientId} backButtonLink={PATH_PAGE.doctor.root} />
        </div>
        : null}

      {/* {
        location.pathname === PATH_PAGE.doctor.record(params.patientId)
          ? <WriteDown patientId={params.patientId!} /> : < >22</>
      } */}
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.patients.add)}>
        <AiOutlinePlusCircle />
        Добавить запись
      </Button>
    </div>
  );
}
