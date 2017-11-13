interface HttpConfig {
    endpointUrl: string;
    tokenUrl: string;
    apiVersion: number;
}

//export const HTTP_SERVICE_VARIABLES: HttpConfig = {
//    endpointUrl: 'https://easypay-int.fnf.com/api/',
//    tokenUrl: 'https://easypay-int.fnf.com/api/oauth/token',
//    apiVersion: 1
//};

export const HTTP_SERVICE_VARIABLES: HttpConfig = {
    endpointUrl: 'http://localhost:56086/api/',
    tokenUrl: 'http://localhost:56086/api/oauth/token',
    apiVersion: 1
};
