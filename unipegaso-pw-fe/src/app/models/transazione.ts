import { Asset } from "./asset";
import { Utente } from "./utente";

export class Transazione {
    id?: number;
    quote?: number;
    prezzo?: number;
    data?: Date;
    acquisto?: boolean;
    utente?: Utente;
    asset?: Asset;
}