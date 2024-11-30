/**
 * Fetches the API to check if it is up and running
 * @returns {Response} - Returns the response from the API
 */
const pingApi = async () : Promise<Response> => {
    const response:Response = await fetch('/api');
    return response;
}

export default pingApi;