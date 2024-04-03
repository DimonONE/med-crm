import { InfiniteData } from '@tanstack/react-query';
import { Api } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CreateAttendanceListData } from '~widgets/staff-attendance';

function createData({ userId, timeMonth, timeWeek, vacations, workTimes, visits }: CreateAttendanceListData): CreateAttendanceListData {
  return { userId, timeMonth, timeWeek, vacations, workTimes, visits };
}

export function generateAttendanceList(data: InfiniteData<Api.ResponseVisitSchemaDto[]> | undefined) {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) =>
        createData({
          userId: user.doctor.id,
          timeMonth: user.totalMonth,
          timeWeek: user.totalWeek,
          vacations: user.doctor.vacations,
          workTimes: user.doctor.workTimes,
          visits: user.doctor.visits,
        }),
      ),
    );
}

export function generateSidebarItemList(data: InfiniteData<Api.ResponseVisitSchemaDto[]> | undefined): any[] {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) =>
      ({
        id: user.doctor.id,
        title: user.doctor.fullName,
        subTitle: user.doctor.specialization,
        link: PATH_PAGE.personnel.details(user.doctor.id),
      }),
      ),
    );
}
