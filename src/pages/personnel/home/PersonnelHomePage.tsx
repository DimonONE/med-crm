import { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { personnelApi } from '~entities/personnel';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Search } from '~shared/ui/search';
import { handleScroll } from '~shared/utils';
import { dataLength, filterObject } from '~shared/utils/helpers';
import { PersonnelList } from '~widgets/personnel';
import { SidebarItemList } from '~widgets/sidebar-items-list';
import { generatePersonnelList, generateSidebarItemList } from './lib/utils';
import s from './styles.module.scss';

export function PersonnelHomePage() {
  const block1Ref = useRef<HTMLInputElement>(null);
  const block2Ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const [filters, setFilters] = useState<Partial<personnelApi.QueryListOfUsers> | null>(null);
  const { data, fetchNextPage, updateQueryParameters, hasNextPage } = personnelApi.useListOfPersonnelInfinity();

  const sidebarItemList = useMemo(() => generateSidebarItemList(data), [data]);
  const personnelList = useMemo(() => generatePersonnelList(data), [data]);

  useEffect(() => {
    const newQuery = filters ? filterObject(filters) : {};
    updateQueryParameters({ ...newQuery });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    handleScroll(block1Ref, block2Ref)();
  }, [params]);

  return (
    <div className={s.root}>
      <div className='d-flex'>
        <SidebarItemList
          ref={block1Ref}
          items={sidebarItemList}
          selectId={params?.clinicId}
          onScroll={handleScroll(block1Ref, block2Ref)}
        >
          <Search isSearch filters='Ф.И.О.' handleChange={(value) => {
            setFilters(prev => ({ ...prev, filter: value }));
          }}
          />
        </SidebarItemList>
        <PersonnelList
          ref={block2Ref}
          personnelList={personnelList}
          hasNextPage={hasNextPage}
          handleFetchNextPage={fetchNextPage}
          handleUpdateFilters={(filter) => {
            setFilters(prev => ({ ...prev, ...filter }));
          }}
          dataLength={dataLength(data)}
          onScroll={handleScroll(block2Ref, block1Ref)}
        />
      </div>
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.personnel.add)}>
        <AiOutlinePlusCircle />
        Добавить персонал
      </Button>
    </div>
  );
}
