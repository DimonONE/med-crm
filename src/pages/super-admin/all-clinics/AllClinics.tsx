import { useEffect, useMemo, useRef, useState } from 'react';
import { FetchNextPageOptions, InfiniteData } from '@tanstack/react-query';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectClinic, superAdminApi } from '~entities/super-admin';
import { UserEntityDto } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { AllClinicTable } from '~widgets/super-admin/';

function createData(
  id: string | number,
  createdAt: string,
  city: string,
  address: string,
  phone: string,
  fullName: string,
  dateOfBirth: string,
  status: boolean,
) {
  return { id, createdAt, city, address, phone, fullName, dateOfBirth, status };
}

type Params = {
  clinicId?: string
};

export function AllClinics() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, updateQueryParameters } = superAdminApi.useListOfUsersInfinity({});
  const [filters, setFilters] = useState<Partial<superAdminApi.ListOfUsersQuery> | null>(null);

  const block1Ref = useRef<HTMLInputElement>(null);
  const block2Ref = useRef<HTMLInputElement>(null);

  const dataLength = data?.pages.reduce((total, page) => total + page.length, 0) || 0;

  const sidebarItemList = useMemo(() => {
    if (!data?.pages.length) return [];

    return data.pages
      .flatMap((page) =>
        page.map((user) =>
          user.clinic && {
            id: user.clinic.id.toString(),
            title: user.clinic.name,
            subTitle: `Код клиники: ${user.clinic?.id}`,
            link: PATH_PAGE.superAdmin.selectClinic(user.clinic.id),
          },
        ),
      )
      .filter(Boolean);
  }, [data]);

  const clinicList = useMemo(() => {
    if (!data?.pages.length) return [];

    return data.pages
      .flatMap((page) =>
        page.map((user) => user.clinic &&
          createData(
            user.clinic.id,
            user.clinic.createdAt,
            user.clinic.country,
            user.clinic.address,
            user.clinic.phone,
            user.clinic.name,
            user.clinic.endPaidDate,
            user.clinic.status,
          ),
        ),
      )
      .filter(Boolean);
  }, [data]);


  const selectClinic = (
    dataUser: InfiniteData<UserEntityDto[]> | undefined,
    clinicId: number,
  ): UserEntityDto | undefined => dataUser?.pages
    .flatMap((page) =>
      page.map((user) => user),
    ).find(user => user.clinic?.id === clinicId);



  const filterObject = (obj: Partial<superAdminApi.ListOfUsersQuery>) => Object.fromEntries(
    Object.entries(obj).filter(([, value]) => ![undefined, null, ''].includes(value?.toString())),
  ) as superAdminApi.ListOfUsersQuery;

  const handleNext = async (options?: FetchNextPageOptions | undefined) => {
    const newQuery = filters ? filterObject(filters) : {};
    const newOptions = options?.pageParam ? filterObject({ ...options.pageParam }) : {};

    console.log('test', {
      pageParam: {
        ...newQuery, offset: dataLength,
        ...newOptions,
      },
    });


    return fetchNextPage({
      pageParam: {
        ...newQuery, offset: dataLength,
        ...newOptions,
      },
    });
  };


  useEffect(() => {
    const newQuery = filters ? filterObject(filters) : {};

    updateQueryParameters({ ...newQuery, offset: 1 });
  }, [filters]);

  useEffect(() => {
    handleScroll(block1Ref, block2Ref)();
  }, [params]);


  console.log('data', data);
  // console.log('clinicList', clinicList);

  return (
    (<div className="super-admin-page">
      <div className='d-flex'>
        <SidebarItemList
          ref={block1Ref}
          items={sidebarItemList}
          selectId={params?.clinicId}
          onScroll={handleScroll(block1Ref, block2Ref)}
        >
          <Search isSearch filters='Все категории' handleChange={(value) => {
            setFilters(prev => ({ ...prev, filter: value }));
          }}
          />
        </SidebarItemList>
        <div className='container'>
          {
            !params.clinicId
              ? <AllClinicTable
                ref={block2Ref}
                clinicList={clinicList}
                hasNextPage={hasNextPage}
                handleFetchNextPage={handleNext}
                handleUpdateFilters={(filter) => {
                  setFilters(prev => ({ ...prev, ...filter }));
                }}
                dataLength={dataLength}
                onScroll={handleScroll(block2Ref, block1Ref)}
              />
              : <SelectClinic selectClinic={selectClinic(data, Number(params.clinicId))} />
          }
        </div>
        <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.superAdmin.addClinic)}>
          <AiOutlinePlusCircle />
          Добавить клинику
        </Button>
      </div>
    </div>)
  );
}
