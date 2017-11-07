interface HttpConfig {
    endpointUrl: string;
    tokenUrl: string;
    apiVersion: number;
}

export const HTTP_SERVICE_VARIABLES: HttpConfig = {
    endpointUrl: 'https://easypay-int.fnf.com/api/',
    tokenUrl: 'https://easypay-int.fnf.com/api/oauth/token',
    apiVersion: 1
};
