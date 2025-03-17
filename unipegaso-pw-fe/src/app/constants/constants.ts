export class MarketEnpoints {
    public static readonly BASE_PATH = '/api/market'
    public static readonly AVAILABLE_ASSETS = this.BASE_PATH + '/available-assets'
}

export class UserEndpoints {
    public static readonly BASE_PATH = '/api/user'
    public static readonly LOGIN = this.BASE_PATH + '/login'
    public static readonly GET_USER = this.BASE_PATH
    public static readonly VERSA_PRELEVA = this.BASE_PATH + '/versa-preleva'
}

export const COLORS = ['red','green','blue','yellow','pink']