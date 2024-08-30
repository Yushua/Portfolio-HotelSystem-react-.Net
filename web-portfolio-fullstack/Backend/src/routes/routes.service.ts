import { Reflector } from '@nestjs/core';
import { ROUTE_METADATA_KEY } from './route.decorator'; // Ensure correct path
import { Injectable, RequestMethod } from '@nestjs/common';

@Injectable()
export class RouteService {
  constructor(private readonly reflector: Reflector) {}

  async getRoutes(): Promise<any[]> {
    const routes = [];

    // Retrieve all modules and their controllers
    const modules = this.getModules();
    for (const module of modules) {
      for (const controller of module.controllers || []) {
        const controllerRoutes = this.getControllerRoutes(controller);
        routes.push(...controllerRoutes);
      }
    }

    return routes;
  }

  private getModules(): any[] {
    // This should be replaced with actual method to get modules
    // This part may require custom logic or internal APIs
    // Example: return NestFactory.create(AppModule).then(app => app.getModules());
    return []; // Placeholder
  }

  private getControllerRoutes(controller: any): any[] {
    const routes = [];
    const controllerPath = this.reflector.get<string>('path', controller);

    Object.getOwnPropertyNames(controller.prototype).forEach((methodName) => {
      const methodRoutes = this.reflector.get<any[]>(
        ROUTE_METADATA_KEY,
        controller.prototype[methodName],
      );
      if (methodRoutes) {
        methodRoutes.forEach((route) => {
          routes.push({
            controller: controller.name,
            method: methodName,
            path: `${controllerPath}${route.path}`,
            httpMethod: RequestMethod[route.method],
          });
        });
      }
    });

    return routes;
  }
}
