import { useMemo } from 'react';
import dayjs from 'dayjs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectClinic, useListOfUsers } from '~entities/super-admin';
import { SearchPersonnel } from '~features/personnel';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AllClinicTable } from '~widgets/super-admin/';

function createData(
  id: string | number,
  date: string,
  city: string,
  street: string,
  phone: string,
  fullName: string,
  dateOff: string,
  status: boolean,
) {
  return { id, date, city, street, phone, fullName, dateOff, status };
}

type Params = {
  clinicId?: string
};

export function AllClinics() {
  const params = useParams<Params>();

  const navigate = useNavigate();
  // @ts-ignore
  const { data } = useListOfUsers({
    limit: 10,
    status: 'approval',
    sortBy: 'ASC',
    // fieldSort: null,
    // category: null,
    // filter: null,
  });

  const sidebarItemList = useMemo(() => data
    ? data.map((user) => user.clinic && ({
      id: user.clinic.id.toString(),
      title: `Клиника ${user.clinic.name}`,
      subTitle: `Код клиники: ${user.clinic?.id}`,
      link: PATH_PAGE.superAdmin.selectClinic(user.clinic.id),
    })).filter(Boolean)
    : [], [data]);

  const clinicTableList = useMemo(() => data
    ? data.map((user) => user.clinic &&
      createData(
        user.clinic.id,
        dayjs(user.clinic.createdAt).format('DD.MM.YYYY'),
        user.clinic.country,
        user.clinic.address,
        user.clinic.phone,
        user.clinic.name,
        user.clinic.endPaidDate,
        user.clinic.status,
      )).filter(Boolean)
    : [], [data]);

  return (
    <div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList
          items={sidebarItemList}
          selectId={params?.clinicId}
        >
          <SearchPersonnel />
        </SidebarItemList>
        <div className='container'>
          {
            params.clinicId
              ? <SelectClinic clinicId={Number(params.clinicId)} />
              : <AllClinicTable tableList={clinicTableList} />
          }
        </div>
        <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.superAdmin.addClinic)}>
          <AiOutlinePlusCircle />
          Добавить клинику
        </Button>
      </div>
    </div>
  );
}
