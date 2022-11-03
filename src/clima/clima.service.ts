import { Injectable } from '@nestjs/common'
// import * as htmlToImage from 'html-to-image'
import nodeHtmlToImage from 'node-html-to-image'

import { JSDOM } from 'jsdom'
import axios from 'axios'

declare global {
  namespace NodeJS {
    interface Global {
      document: Document
      window: Window
      navigator: Navigator
    }
  }
}

@Injectable()
export class ClimaService {
  async criateElement() {
    let dom = new JSDOM(
      `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fascinate&family=Inter:wght@700&display=swap');

    body {
      background: transparent;
      /* Make it white if you need */
      color: #ffffff;
      
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    #pic {
      margin: 3px;
      border-radius: 10px;
      padding: 10px;
      display: block;
      height: 100px;
      widows: 700px;
      background-color: red;
    }

    #outer {
      background: #fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJ1P-5wrV_1G-2XFQY11N0iP5NJJeTVvS0w&usqp=CAU) center center/cover no-repeat;
      border-radius: 0px;
      align-items: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      height: 500px;
      width: 700px;
    }

    #inner {
      font-family: 'Inter';
      /* opacity: 0.15; */
      padding: 20px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.425);
      height: 300px;
      width: 500px;
    }

    #flex-container {
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>

<body>
  <div id="outer">

    <div id="inner">

      <div id="flex-container">
        <div>
          <h1 id="cidade">Unaí, MG</h1>
          <h3 id="data">13 de Set. 2022</h3>
          <img src="https://i.ibb.co/bgfSjkj/storm-1.png" />
        </div>
        <div>
          <h1 id="temperatura" style="font-size: 60px;">72°</h1>
          <h2 id="minMax" style="font-size: 14px;">19°/29°</h2>
        </div>
      </div>

      <div id="flex-container">
        <div style="margin-top:8px ;">
          <span>Seg</span>
          <br />
          <br />
          <img width="24px" src="https://i.ibb.co/bgfSjkj/storm-1.png" />
          <br />
          <span id="seg">19°</span>
        </div>
        <div style="margin-top:8px ;">
          <span>Ter</span>
          <br />
          <br />
          <img width="24px" src="https://i.ibb.co/bgfSjkj/storm-1.png" />
          <br />
          <span id="ter">19°</span>
        </div>
        <div style="margin-top:8px ;">
          <span>Qaua</span>
          <br />
          <br />
          <img width="24px" src="https://i.ibb.co/bgfSjkj/storm-1.png" />
          <br />
          <span id="qua">19°</span>
        </div>
        <div style="margin-top:8px ;">
          <span>Qui</span>
          <br />
          <br />
          <img width="24px" src="https://i.ibb.co/bgfSjkj/storm-1.png" />
          <br />
          <span id="qui">19°</span>
        </div>
        <div style="margin-top:8px ;">
          <span>Sext</span>
          <br />
          <br />
          <img width="24px" src="https://i.ibb.co/bgfSjkj/storm-1.png" />
          <br />
          <span id="sex">19°</span>
        </div>
        <div style="margin-top:8px ;">
          <span>Sab</span>
          <br />
          <br />
          <img width="24px" src="https://i.ibb.co/bgfSjkj/storm-1.png" />
          <br />
          <span id="sab">19°</span>
        </div>

      </div>

    </div>

  </div>

 
  <script src="index.js"></script>
</body>

</html>`
    )
    const document = dom.window.document

    const cidade = document.getElementById('cidade')
    const data = document.getElementById('data')
    const temeperaturaAtual = document.getElementById('temperatura')
    const minMax = document.getElementById('minMax')

    const seg = document.getElementById('seg')
    const ter = document.getElementById('ter')
    const qua = document.getElementById('qua')
    const qui = document.getElementById('qui')
    const sex = document.getElementById('sex')
    const sab = document.getElementById('sab')

    await axios
      .get(
        'https://api.hgbrasil.com/weather?key=1cd578c4&city_name=Paracatu,MG'
      )
      .then(result => {
        //console.log(result?.data?.results)
        cidade.innerHTML = result?.data?.results?.city
        data.innerHTML = result?.data?.results?.time
        temeperaturaAtual.innerHTML = `${result?.data?.results?.temp}°`
        minMax.innerHTML = `ventos de ${result?.data?.results?.wind_speedy}`
        seg.innerHTML = `${result?.data?.results?.forecast[0]?.max}° / ${result?.data?.results?.forecast[0]?.min}°`
        ter.innerHTML = `${result?.data?.results?.forecast[1]?.max}° / ${result?.data?.results?.forecast[0]?.min}°`
        qua.innerHTML = `${result?.data?.results?.forecast[2]?.max}° / ${result?.data?.results?.forecast[0]?.min}°`
        qui.innerHTML = `${result?.data?.results?.forecast[3]?.max}° / ${result?.data?.results?.forecast[0]?.min}°`
        sex.innerHTML = `${result?.data?.results?.forecast[4]?.max}° / ${result?.data?.results?.forecast[0]?.min}°`
        sab.innerHTML = `${result?.data?.results?.forecast[5]?.max}° / ${result?.data?.results?.forecast[0]?.min}°`
      })
      .catch(erro => {
        console.log(erro)
      })

    // const value = dom.window.document.querySelector('p').textContent
    const value = 'lucas'
    // return document.getElementById('cidade').textContent
    //const re = await this.gerarImagem(document)
    //console.log(document.getElementsByTagName('html')[0].innerHTML)
    return document.getElementsByTagName('html')[0].innerHTML
  }
  async show() {
    console.log("howred! what is going on?")
  }

  async gerarImagem(document: Document) {
    var node = document.getElementById('outer')
    nodeHtmlToImage({
      html: '<html><body>Hello {{name}}!</body></html>',
      content: [
        { name: 'Pierre', output: './image1.png' },
        { name: 'Paul', output: './image2.png' },
        { name: 'Jacques', output: './image3.png' },
      ],
    })
      .then(() => console.log('The images were created successfully!'))
      .catch(error => {
        console.log('error')
      })
  }
}
