import { ApiListResponse, Api } from './base/api';
import { IProduct, IUser, IOrderResult } from '../types';

interface IWebLarekAPI {
	getCardList: () => Promise<IProduct[]>;
	orderLots: (order: IUser) => Promise<IOrderResult>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCardList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getCardItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}
	
	orderLots(order: IUser): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}