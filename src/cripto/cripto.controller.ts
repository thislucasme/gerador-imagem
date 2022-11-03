import { Body, Controller, Post } from '@nestjs/common'
import { criptoUmDto } from './cripto.dto'
import { CriptoService } from './cripto.service'

@Controller('cripto')
export class CriptoController {
	constructor(private readonly cripto: CriptoService) { }

	@Post('decrypt')
	async decriptarUm(@Body() body: criptoUmDto) {
		const { cifra, chave } = body
		const decoded = await this.cripto.publicDecript(cifra, chave)
		return decoded
	}
	@Post('encrypt')
	async encriptarUm(@Body() body: criptoUmDto) {
		const { cifra, chave } = body
		const encoded = await this.cripto.publicEncript(cifra, chave)
		return encoded
	}

}
