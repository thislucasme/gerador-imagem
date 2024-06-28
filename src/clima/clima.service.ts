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
  async criateElement(message: string) {
    let dom = new JSDOM(
      `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliação</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            text-align: center;
            background-color: #f0f0f0;
            height: 200px;
            max-width: 300px;

        }
        .container {
            max-width: 100%;
            height: 300px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .circle-bar {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: conic-gradient(#4caf50 0% 80%, #ddd 80% 100%);
            margin: 0 auto;
        }
        .circle-bar::after {
            content: '80%';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: bold;
            color: #4caf50;
        }
        .note {
            margin: 10px 0;
            font-size: 18px;
            font-weight: bold;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .grammar {
            font-size: 16px;
            color: #333;
            margin-top: 20px;
        }
        .wrong {
         color: red; 
         text-decoration: line-through;  
        }
               .correction {
         color: green;   
        }
        }
    </style>
</head>
<body >
    <div class="container">

        <div class="note">Nota Geral</div>
        <div class="message">You are doing great!</div>
        <div class="grammar">Gramática: 80/100</div>
        
<div>
      ${message}
</div>
    </div>
</body>
</html>
`
    )
    const document = dom.window.document

    
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
