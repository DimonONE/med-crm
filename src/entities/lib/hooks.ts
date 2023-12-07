import { QueryFunction, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

export type QueryListOfUsers = {
  limit: number | null;
  offset: number | null;
  sortBy: SortByType;
  fieldSort: string | null;
  category: string | null;
  filter: string | null;
  role: string | null;
};

export type Keys = {
  queryKey: QueryKey,
  queryFn: QueryFunction<any>
  defaultQuery?: Partial<QueryListOfUsers> 
};

export function useListOfInfinity({ queryKey, queryFn }: Keys, initialQuery?: Partial<QueryListOfUsers>) {
  let defaultQuery: QueryListOfUsers = {
    ...initialQuery,
  } as QueryListOfUsers;

  const { data, refetch, ...props } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage, allPages) => {
      const dataLength = allPages.reduce((total, page) => total + page.length, 0) || 0;
      
      if (lastPage.length === 0) {
        return undefined;
      }
      return { offset: dataLength + 1 };
    },
 });

  const updateQueryParameters = async (newQuery: Partial<QueryListOfUsers>) => {
    defaultQuery = { ...defaultQuery, ...newQuery  };
    console.log('defaultQuery', defaultQuery);
    
    refetch({
      queryKey: [queryKey, defaultQuery],
    });
  };
 return { data, refetch, updateQueryParameters, ...props };
}
