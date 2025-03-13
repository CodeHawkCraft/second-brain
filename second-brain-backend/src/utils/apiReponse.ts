class ApiResponse {
    statusCode:number;
    success:boolean;
    data:any;
    message:string;
    constructor(statusCode:number, message = "Success", data={}){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}
export default ApiResponse;