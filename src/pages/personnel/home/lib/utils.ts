import { InfiniteData } from '@tanstack/react-query';
import { UserEntityDto } from '~shared/api/realworld';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CreatePersonnelListData } from '~widgets/personnel';

function createData({  
  id,
  createdAt,
  role,
  phone,
}: CreatePersonnelListData) {
  return { id, createdAt, role, phone  };
}

export function generatePersonnelList(data: InfiniteData<UserEntityDto[]> | undefined) {
  if (!data?.pages.length) return [];

  return data.pages
    .flatMap((page) =>
      page.map((user) => 
        createData({
          id: user.id,
          createdAt: user.createdAt,
          role: user.role,
          phone: user.phone,
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
          subTitle: `Код клиники: ${user.id}`,
          link: PATH_PAGE.personnel.details(user.id),
        }),
      ),
    );
}
