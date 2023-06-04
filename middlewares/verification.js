
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET



module.exports = {
    authenticateToken:(req,res,next)=>{
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token)


        if (!token) {
            console.log("no token")
            return res.status(401).json({ message: 'Authentication required.' });
        }
    
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log('invalid token')
                return res.status(403).json({ message: 'Invalid token.' });
            }
    
            req.user = user;
            console.log('token valid')
            next();
        });
    },
    generateToken:(user)=>{
        console.log('genereate token called')
        const payload = { id: user._id, username: user.email };
        return jwt.sign(payload, secretKey);
        
    }
}