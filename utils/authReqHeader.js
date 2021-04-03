const authReqHeader = (ctx) => {
    return {
        headers:
            { authorization: 'Bearer ' + ctx.req.headers.cookie.replace('jwt=', '') }
    };
}

export default authReqHeader;