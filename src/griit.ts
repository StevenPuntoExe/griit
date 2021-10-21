import { cognomi } from "./cognomi";
import { comuni } from "./comuni";
import { nomi } from "./nomi";

export class Griit {
    // Ripassino sul funzionamento di random
    // Math.floor(Math.random() * 3);
    // expected output: 0, 1 or 2
    public getPersonaRandom(): any {
        // Cognome
        const indexCognomeRandom: number = Math.floor(Math.random() * cognomi.length);
        // Nome
        const indexNomeRandom: number = Math.floor(Math.random() * nomi.length);

        // Anno di nascita
        const annoDiNascitaRandom: number = Math.floor(Math.random() * 100);
        const meseDiNascitaRandom: number = Math.floor(Math.random() * 12) + 1;
        const giornoDiNascitaRandom: number = Math.floor(Math.random() * 28) + 1;

        // Comune di nascita (Bologna = 1205)
        const indexComuneRandom: number = Math.floor(Math.random() * comuni.length);

        const codiceFiscale: string = this.getCodiceFiscale(cognomi[indexCognomeRandom], nomi[indexNomeRandom].nome, nomi[indexNomeRandom].sesso, annoDiNascitaRandom, meseDiNascitaRandom, giornoDiNascitaRandom, comuni[indexComuneRandom][0].toLocaleString());

        return {
            cognome: cognomi[indexCognomeRandom],
            nome: nomi[indexNomeRandom].nome,
            sesso: nomi[indexNomeRandom].sesso,
            giornoDiNascita: giornoDiNascitaRandom,
            meseDiNascita: meseDiNascitaRandom,
            annoDiNascita: ("0" + annoDiNascitaRandom).slice(-2),
            comuneDiNascita: comuni[indexComuneRandom][2].toLocaleString(),
            provinciaDiNascita: comuni[indexComuneRandom][1].toLocaleString(),
            codiceFiscale: codiceFiscale
        }
    }

    private getCodiceFiscale(cognome: string, nome: string, sesso: string, annoDiNascita: number, meseDiNascita: number, giornoDiNascita: number, comuneDiNascita: string): string {
        // Ottengo cognome cf
        const cognomeCf = `${this.estraiConsonanti(cognome)}${this.estraiVocali(cognome)}XXX`

        // Ottengo Nome cf
        let nomeCf = this.estraiConsonanti(nome)
        if (nomeCf.length >= 4) {
            nomeCf = nomeCf.charAt(0) + nomeCf.charAt(2) + nomeCf.charAt(3)
        } else {
            nomeCf += `${this.estraiVocali(nome)}XXX`
            nomeCf = nomeCf.substr(0, 3)
        }

        // Ottengo Anno di nascita cf
        const annoDiNascitaStr: string = ("0" + annoDiNascita).slice(-2);

        // Ottengo Mese di nascita cf
        const meseDiNascitaStr: string = this.MESI_CODIFICATI[meseDiNascita - 1];

        // Ottengo Giorno di nascita cf
        const costanteSessuale: number = sesso == 'F' ? 40 : 0;
        const giornoDiNascitaRandomSessualizzato: number = giornoDiNascita + costanteSessuale;
        const giornoDiNascitaRandomSessualizzatoStr: string = ("0" + giornoDiNascitaRandomSessualizzato).slice(-2);

        // Ottengo check digit
        const codiceFiscaleTemp: string =
            cognomeCf.substr(0, 3).toUpperCase() +
            nomeCf.toUpperCase() +
            annoDiNascitaStr +
            meseDiNascitaStr +
            giornoDiNascitaRandomSessualizzatoStr +
            comuneDiNascita;
        const checkDigit = this.getCheckCode(codiceFiscaleTemp);

        // Ottengo infine il codice fiscale
        const codiceFiscaleGenerato: string = codiceFiscaleTemp + checkDigit;

        return codiceFiscaleGenerato;
    }

    private estraiVocali(str: string): string {
        return str.replace(/[^AEIOU]/gi, '')
    }
    private estraiConsonanti(str: string): string {
        return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '')
    }
    private readonly MESI_CODIFICATI = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];

    private getCheckCode(codiceFiscale: string): string {
        codiceFiscale = codiceFiscale.toUpperCase();
        let val = 0;
        for (let i = 0; i < 15; i = i + 1) {
            const c = codiceFiscale[i];
            val += i % 2 !== 0 ? this.cifraPari(c) : this.cifraDispari(c);
        }
        val = val % 26
        return this.CHECK_CODE_CHARS.charAt(val)
    }

    private cifraPari(carattere: string): number {
        switch (carattere) {
            case '0': return 0;
            case '1': return 1;
            case '2': return 2;
            case '3': return 3;
            case '4': return 4;
            case '5': return 5;
            case '6': return 6;
            case '7': return 7;
            case '8': return 8;
            case '9': return 9;
            case 'A': return 0;
            case 'B': return 1;
            case 'C': return 2;
            case 'D': return 3;
            case 'E': return 4;
            case 'F': return 5;
            case 'G': return 6;
            case 'H': return 7;
            case 'I': return 8;
            case 'J': return 9;
            case 'K': return 10;
            case 'L': return 11;
            case 'M': return 12;
            case 'N': return 13;
            case 'O': return 14;
            case 'P': return 15;
            case 'Q': return 16;
            case 'R': return 17;
            case 'S': return 18;
            case 'T': return 19;
            case 'U': return 20;
            case 'V': return 21;
            case 'W': return 22;
            case 'X': return 23;
            case 'Y': return 24;
            case 'Z': return 25;
            default: return 0;
        }
    }

    private cifraDispari(carattere: string): number {
        switch (carattere) {
            case '0': return 1;
            case '1': return 0;
            case '2': return 5;
            case '3': return 7;
            case '4': return 9;
            case '5': return 13;
            case '6': return 15;
            case '7': return 17;
            case '8': return 19;
            case '9': return 21;
            case 'A': return 1;
            case 'B': return 0;
            case 'C': return 5;
            case 'D': return 7;
            case 'E': return 9;
            case 'F': return 13;
            case 'G': return 15;
            case 'H': return 17;
            case 'I': return 19;
            case 'J': return 21;
            case 'K': return 2;
            case 'L': return 4;
            case 'M': return 18;
            case 'N': return 20;
            case 'O': return 11;
            case 'P': return 3;
            case 'Q': return 6;
            case 'R': return 8;
            case 'S': return 12;
            case 'T': return 14;
            case 'U': return 16;
            case 'V': return 10;
            case 'W': return 22;
            case 'X': return 25;
            case 'Y': return 24;
            case 'Z': return 23;
            default: return 0;
        }
    }

    private readonly CHECK_CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}
