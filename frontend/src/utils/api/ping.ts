const pingApi = async () : Promise<Response> => {

    const response:Response = await fetch('/api');
    return response;
}

export default pingApi;