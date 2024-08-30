import { SetMetadata } from '@nestjs/common';

export const ROUTE_METADATA_KEY = 'routes';
export const RouteMetadata = (method: string, path: string) =>
  SetMetadata(ROUTE_METADATA_KEY, { method, path });
