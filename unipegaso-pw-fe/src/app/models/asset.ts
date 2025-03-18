import { Price } from "./price"

export class Asset {
    ticker!: string
    nome!: string
    logo!: string
    prezzi!: Price[]
    ultimoPrezzo?: number = 0
}