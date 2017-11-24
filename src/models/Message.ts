export class Message{
    from:string;
    date:Date;
    latitude:string;
    longitude:string;
    status: 2
    
    constructor(from:string,date:Date,latitude:string,longitude:string){
        this.from = from;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
    };
}