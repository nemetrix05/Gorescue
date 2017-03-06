export class Producer{
	constructor(
		public _id:string,
		public email : string,
		public displayName: string,
		public avatar: string,
		public password: string,
		public signupDate: string,
		public nit: string,
		public address: string,
		public phone: string,
		public mobile:string,
		public website:string,
		public nameRep :string,
		public lastnameRep:string,
		public typeDocRep:string,
		public documentRep:string,
		public phoneRep:string,
		public mobileRep:string,
		public addressRep:string,
		public status:string,
		public eventTypes : Array<any>,   // Array de tipos de eventos
		public events: Array<string>// Array de ID's de eventos
	){}
}