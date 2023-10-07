import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { AppointmentSchedule, TimeWorks } from '~widgets/doctor';


export function DoctorPage() {
  const navigate = useNavigate();


  return (
    <div className="doctor-page">
      <TimeWorks />
      <AppointmentSchedule />

      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.addClinic)}>
        <AiOutlinePlusCircle />
        Добавить запись
      </Button>
    </div>
  );
}
