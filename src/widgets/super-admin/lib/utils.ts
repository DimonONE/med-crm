import { InfiniteData } from '@tanstack/react-query';
import { superAdminApi } from '~entities/super-admin';
import { UserEntityDto } from '~shared/api/realworld';

export function selectClinic(
  dataUser: InfiniteData<UserEntityDto[]> | undefined,
  clinicId: number,
): UserEntityDto | undefined {
  return dataUser?.pages
    .flatMap((page) =>
      page.map((user) => user),
    ).find(user => user.clinic?.id === clinicId);
}

export function dataLength(data: InfiniteData<UserEntityDto[]> | undefined) {
  return data?.pages.reduce((total, page) => total + page.length, 0) || 0;
}

export function filterObject(obj: Partial<superAdminApi.ListOfUsersQuery>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => ![undefined, null, ''].includes(value?.toString())),
  ) as superAdminApi.ListOfUsersQuery;
}