import jwt from 'jsonwebtoken';

const secret = 'test';

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isManual = token.length < 500;

        if(token && isManual){
            let decoded = jwt.verify(token, secret);
            req.userID = decoded?.id;
        }else{
            let decoded = jwt.decode(token);
            req.userID = decoded?.sub;
        }

        next();
        
    } catch (error) {
        console.log(error);
    }
}

export default auth;