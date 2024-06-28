import { Body, Controller, Get, Res } from '@nestjs/common'
import { ClimaService } from './clima.service'
import nodeHtmlToImage from 'node-html-to-image'
import { launch } from 'puppeteer'
import { Response } from 'express'
import {
  search,
  getVideoInfo,
  downloadFromVideo,
  YoutubeSearchVideoInfo,
} from 'youtube-scrapper'
import { createWriteStream } from 'fs'
@Controller('clima')
export class ClimaController {
  constructor(private climaService: ClimaService) {}
  @Get()
  async get(@Res() res: Response) {
    const html = await this.climaService.criateElement("")

    const image = await nodeHtmlToImage({
      html: html,
    })

    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.end(image, 'base64')
    // return this.climaService.criateElement()
  }
    @Get("relatorio")
  async gerarRelatorio(@Res() res: Response, @Body() body: any) {
    const html = await this.climaService.criateElement(body?.mensagem)

    const image = await nodeHtmlToImage({
      html: html,
    })

    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.end(image, 'base64')
    // return this.climaService.criateElement()
  }
  @Get('youtube')
  show() {
    this.main()
    return {}
  }
  async main() {
    ;(async () => {
      const browser = await launch()
      const page = await browser.newPage()
      await page.goto('https://www.magazineluiza.com.br/busca/225461500/')
      console.log('start evaluate javascript')

      await page.waitForSelector('.iSRQeC')
      await page.$$eval('li a', liks => {
        console.log(liks)
      })

      await browser.close()
    })()
    // Getting videos through query.
    //const result = await search('ponto em comum')
    //console.log(result.videos.map((vid: YoutubeSearchVideoInfo) => vid)) // Array of videos mapped by name.
    // Downloading first result and piping to a file.
    // We have to get the full song info first.
    //const video = await getVideoInfo(result.videos[0].id)
    //console.log(video)
    // Write to file.
    // downloadFromVideo(video).pipe(createWriteStream('./song.ogg'))
  }
}
