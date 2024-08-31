import { Module } from '@nestjs/common';
import { RouteService } from './routes.service';
import { DiscoveryModule } from '@nestjs/core'; // Import DiscoveryModule

@Module({
  imports: [DiscoveryModule], // Ensure DiscoveryModule is imported
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteServiceModule {}
