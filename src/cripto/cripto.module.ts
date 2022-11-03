import { CriptoController } from './cripto.controller';
import { CriptoService } from './cripto.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [],
    controllers: [
        CriptoController,],
    providers: [
        CriptoService, ConfigService],
})
export class CriptoModule { }
