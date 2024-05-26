import winston from "winston";



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({ filename: 'combined.log' }),
  ],
});


const loggerMiddleware=(req, res, next)=>{

    if(!req.url.includes("sign") && !req.url.includes("logout"))
        {
            const logdata=`reqUrl: ${req.url} reqBody: ${JSON.stringify(req.body)}`
            logger.info(logdata)
        }
        next();

}

export default loggerMiddleware