export class Pages {
    
    title:string;
    iconIOS: string;
    iconAndroid: string;
    name: string;

    static initPages(){
        return [
            { title: 'Inicio', iconIOS:'ios-search' , iconAndroid:'md-search', name: 'WelcomePage'}
        ];
    }

}