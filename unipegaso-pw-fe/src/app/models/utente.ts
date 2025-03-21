import { AssetUtente } from "./asset-utente"

export class Utente {
    id!: number
    username!: string
    liquidita: number = 0
    assetPosseduti: AssetUtente[] = []
}