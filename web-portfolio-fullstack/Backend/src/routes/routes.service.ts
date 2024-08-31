import { Injectable, OnModuleInit } from '@nestjs/common';
import { Reflector, DiscoveryService } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';

@Injectable()
export class RouteService implements OnModuleInit {
  private routes: any[] = [];

  constructor(
    private readonly reflector: Reflector,
    private readonly discoveryService: DiscoveryService
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getControllers(); // Use getControllers() to get controllers

    providers.forEach((provider) => {
      const { instance } = provider;

      if (instance && instance.constructor) {
        // Get the controller path
        const controllerPath = this.reflector.get<string>(PATH_METADATA, instance.constructor) || '';

        // Get all methods of the controller
        const methods = Object.getOwnPropertyNames(instance.constructor.prototype);

        methods.forEach((method) => {
          // Get the route path and method metadata
          const routePath = this.reflector.get<string>(PATH_METADATA, instance.constructor.prototype[method]);
          const requestMethod = this.reflector.get<RequestMethod>(METHOD_METADATA, instance.constructor.prototype[method]);

          if (routePath && requestMethod !== undefined) {
            this.routes.push({
              controller: instance.constructor.name,
              methodName: method,
              path: `${controllerPath}${routePath}`,
              httpMethod: RequestMethod[requestMethod],
            });
          }
        });
      }
    });
  }

  getRoutes() {
    return this.routes;
  }
}
