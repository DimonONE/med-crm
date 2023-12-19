import {  QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { Api } from '~shared/api/realworld';


type UseListOfInfinityProps<T> = {
  queryKey: QueryKey,
  fetchPage: (query: T) => Promise<Api.UserEntityDto[]>
  initialQuery?: Partial<T>,
};

export function useListOfInfinity<T>({ queryKey, fetchPage, initialQuery }: UseListOfInfinityProps<T>) {
  let defaultQuery: T = {
    offset: 0,
    limit: 10,
    sortBy: 'ASC',
    ...(initialQuery as T),
  };

  const { data, refetch, ...props } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: QueryFunctionContext) => fetchPage({ ...defaultQuery, ...pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const dataLength = allPages.reduce((total, page) => total + page.length, 0) || 0;

      if (lastPage.length === 0) {
        return undefined;
      }
      return { offset: dataLength + 1 };
    },
  });

  const updateQueryParameters = async (newQuery: Partial<T>) => {
    defaultQuery = { ...defaultQuery, ...newQuery };

    refetch({
      queryKey: [queryKey, defaultQuery],
    });
  };

  return { data, refetch, updateQueryParameters, ...props };
}