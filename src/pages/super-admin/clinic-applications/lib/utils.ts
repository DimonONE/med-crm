import { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { UserEntityDto } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';

export type DataTable = {
  id: number,
  createdAt: string,
  link: string,
};

export function createData(
  { id, createdAt, link }: DataTable,
) {
  return { id, createdAt, link };
}

export function generateClinicList(data: InfiniteData<UserEntityDto[]> | undefined): any[] {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) => user.clinic &&
      createData({
        id: user.clinic.id,
        createdAt: dayjs(user.clinic.createdAt).format('DD.MM.YYYY'),
        link: `${PATH_PAGE.superAdmin.selectApplications(user.clinic.id)}`,
      }),
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
          link:  PATH_PAGE.superAdmin.selectApplications(user.clinic.id),
        },
      ),
    )
    .filter(Boolean);
}

