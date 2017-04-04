export class GTEvent{
	constructor(
		public title: string,
		public description: string,
		public time_zone: string,
		public date: string,
		public picture: string,
		public notes: string,
		public status:string,
		public promoted:boolean,
		public category: Array<string>,
		public venue:string
	){}
}