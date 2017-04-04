export class Ticket{
	constructor(
		public _id: string,
		public section: string,
		public row: string,
		public seat: string,
		public price:number,
		public charge: number,
		public subtotal: number,
		public total: number,
		public date: string,
		public purchaseDate: string,
		public encryptCode: string,
		public used: boolean,
		public event: string,
		public user: string
	){}
}