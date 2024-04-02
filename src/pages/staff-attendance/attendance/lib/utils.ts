import { InfiniteData } from '@tanstack/react-query';
import { UserEntityDto } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CreateAttendanceListData } from '~widgets/staff-attendance';

function createData({ settingsId, timeMonth, timeWeek, today, week }: CreateAttendanceListData) {
  return { settingsId, timeMonth, timeWeek, today, week };
}


export function generateAttendanceList(data: InfiniteData<UserEntityDto[]> | undefined) {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((attendance) =>
        createData({
          settingsId: attendance.id,
          timeMonth: '',
          timeWeek: '',
          today: '',
          week: '',
        }),
      ),
    );
}

export function generateSidebarItemList(data: InfiniteData<UserEntityDto[]> | undefined): any[] {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) =>
      ({
        id: user.id,
        title: user.fullName,
        subTitle: user.specialization,
        link: PATH_PAGE.personnel.details(user.id),
      }),
      ),
    );
}
