import { ClimaController } from './clima.controller'
import { ClimaService } from './clima.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [ClimaController],
  providers: [ClimaService],
})
export class ClimaModule {}
