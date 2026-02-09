import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// class APIHandler {
//     private static instance:APIHandler;
//     private _baseURL: URL;

//     private constructor(baseURL:URL){
//         this._baseURL = baseURL;
//     }

//     public static getInstance(): APIHandler {
//         if(!APIHandler.instance){
//             APIHandler.instance = new APIHandler(new URL(__dirname));
//         }
//         return APIHandler.instance;
//     }

//     async fetchData(endpoint:URL){
//         await fetch(`${endpoint}`)
//             .then((res) => {
//                 console.log(res);
//                 // return res.json();
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
            
//     }

//     async postData(endpoint:URL, data:Object){
//         const response = await fetch(`${this._baseURL}/${endpoint}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }, 
//             body: JSON.stringify(data)
//         });
//         return response.json();

//     }
// }

// async function app(){
//     const apiHandler = APIHandler.getInstance();

//     const data = apiHandler.fetchData(new URL('https://jsonplaceholder.typicode.com/users'))

//     console.log(data);
// }
// app();




export class ApiManager {
    private static instance: ApiManager;
    private url: URL;
    private requestCount: Number;
    private requestDate: Date;

    private constructor(){
        // this.url = new URL(process.env.WALMART_DATA_URL || '');
        this.url = new URL('https://jsonplaceholder.typicode.com/users')
        this.requestCount = 0;
        this.requestDate = new Date();
        
    }

    public static getInstance(): ApiManager {
        if(!ApiManager.instance){
            ApiManager.instance = new ApiManager();
        }
        return ApiManager.instance;
    }

    public async fetchData(): Promise<Response> {


        try {
            const response:Response = await fetch(this.url);
            const data:any = response.json();
            return data;
        } catch (error) {
            console.error("Error fetching API data");
            throw new Error("Fetch error"); 
        }
    }

}