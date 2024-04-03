import { InfiniteData } from '@tanstack/react-query';
import { Api } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CreatePatientListData } from '~widgets/patients';

function createData({
  id,
  createdAt,
  fullName,
  dateOfBirth,
  status,
  phone,
}: CreatePatientListData) {
  return { id, createdAt, fullName, dateOfBirth, status, phone };
}

export function generatePatientList(data: InfiniteData<Api.PatientEntityDto[]> | undefined) {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) =>
        createData({
          id: user.id,
          createdAt: user.createdAt,
          fullName: user.fullName,
          dateOfBirth: user.dateOfBirth,
          status: user.status,
          phone: user.phone,
        }),
      ),
    );
}

export function generateSidebarItemList(data: InfiniteData<Api.PatientEntityDto[]> | undefined) {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) =>
      ({
        id: user.id,
        title: user.fullName,
        subTitle: `Код клиники: ${user.id}`,
        link: PATH_PAGE.patients.details(user.id),
      }),
      ),
    );
}
