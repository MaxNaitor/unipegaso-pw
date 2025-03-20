import { Asset } from "./asset";
import { User } from "./user";

export class Transazione {
    id?: number;
    quote?: number;
    prezzo?: number;
    data?: Date;
    acquisto?: boolean;
    utente?: User;
    asset?: Asset;
}