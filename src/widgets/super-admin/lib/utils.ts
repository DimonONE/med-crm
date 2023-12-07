import { InfiniteData } from '@tanstack/react-query';
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

