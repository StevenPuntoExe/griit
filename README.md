# griit

> Random generator of Italian identities for testing purposes

## Overview

If you need a fake random italian identity generator to test your identity hungry app, this may be what you are looking for.

## Installation

```bash
npm install griit
```

## Usage

Here's an example for a base angular project

```TypeScript
import { Component, OnInit } from '@angular/core';
import { Griit } from 'griit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'griit-example';
  private generatore: Griit = new Griit();
  public persona: any;

  ngOnInit() {
    this.persona = this.generatore.getPersonaRandom();

    console.log(this.persona);
  }
}
```
And this is the output:

```json
{
    "cognome": "Greco",
    "nome": "Ginevra",
    "sesso": "F",
    "giornoDiNascita": 22,
    "meseDiNascita": 11,
    "annoDiNascita": "86",
    "comuneDiNascita": "GIOIOSA MAREA",
    "provinciaDiNascita": "ME",
    "codiceFiscale": "GRCGVR86S62E043E"
}
```

enjoy :-)
