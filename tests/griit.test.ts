import { expect } from 'chai';
import { Griit } from '../src/griit';

describe("funzionamento base", (): void => {
    it("Ottenimento identità random", (): void => {
        const griit: Griit = new Griit();
        const persona = griit.getPersonaRandom();
        expect(persona.cognome).to.be.a('string');
        expect(persona.nome).to.be.a('string');
        expect(persona.sesso).to.be.a('string');
        expect(persona.giornoDiNascita).to.be.a('number');
        expect(persona.meseDiNascita).to.be.a('number');
        expect(persona.annoDiNascita).to.be.a('string');
        expect(persona.comuneDiNascita).to.be.a('string');
        expect(persona.provinciaDiNascita).to.be.a('string');
        expect(persona.codiceFiscale).to.be.a('string');
    });
});
