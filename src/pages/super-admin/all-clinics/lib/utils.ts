import { InfiniteData } from '@tanstack/react-query';
import { superAdminApi } from '~entities/super-admin';
import { UserEntityDto } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';

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

export function selectClinic(
  dataUser: InfiniteData<UserEntityDto[]> | undefined,
  clinicId: number,
): UserEntityDto | undefined {
  return dataUser?.pages
    .flatMap((page) =>
      page.map((user) => user),
    ).find(user => user.clinic?.id === clinicId);
}

export function generateClinicList(data: InfiniteData<UserEntityDto[]> | undefined): any[] {
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
}

export function generateSidebarItemList(data: InfiniteData<UserEntityDto[]> | undefined): any[] {
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
}

export function filterObject(obj: Partial<superAdminApi.ListOfUsersQuery>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => ![undefined, null, ''].includes(value?.toString())),
  ) as superAdminApi.ListOfUsersQuery;
}