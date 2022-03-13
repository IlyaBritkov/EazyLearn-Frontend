const checkResponse = (responseStatus: number) => {
    if (responseStatus === 200 || responseStatus === 201) { return true; }
    return false;
};

export default checkResponse;