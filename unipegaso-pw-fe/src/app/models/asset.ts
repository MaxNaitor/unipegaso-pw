import { Price } from "./price"

export class Asset {
    ticker!: string
    name!: string
    icon!: string
    prices!: Price[]
}