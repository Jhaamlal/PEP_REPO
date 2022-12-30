import { pathToUrl } from 'utils';
import { useFetch } from './reactQuery';
import { apiRoutes } from './routes';

export const useGetLevers = (config) =>
  useFetch(pathToUrl(apiRoutes.getAllLevers), undefined, {
    staleTime: Infinity,
    ...config,
  });

export const useGetSingleLever = (sector, config) =>
  useFetch(
    pathToUrl(apiRoutes.getSigleLever, {
      sector,
    }),
    undefined,
    { staleTime: Infinity, ...config },
  );
