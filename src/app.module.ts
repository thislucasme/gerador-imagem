import { ClimaModule } from './clima/clima.module'
import { CriptoModule } from './cripto/cripto.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuracao from './config/configuracao'

@Module({
  imports: [
    ClimaModule,
    CriptoModule,
    ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
