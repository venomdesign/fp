interface HttpConfig {
    endpointUrl: string;
    tokenUrl: string;
    apiVersion: number;
}

export const HTTP_SERVICE_VARIABLES: HttpConfig = {
    endpointUrl: 'http://localhost:56086/api/',
    tokenUrl: 'http://localhost:56086/oauth/token',
    apiVersion: 1
};
