import { AssetUtente } from "./asset-utente"

export class User {
    id!: number
    username!: string
    liquidita: number = 0
    assetPosseduti: AssetUtente[] = []
}