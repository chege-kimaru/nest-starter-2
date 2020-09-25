import { Module } from '@nestjs/common';
import { CloudinaryConfigService } from './cloudinary-config.service';
import { RaveService } from './rave.service';

@Module({
  providers: [CloudinaryConfigService, RaveService],
  exports: [CloudinaryConfigService, RaveService],
})
export class SharedModule {
}
