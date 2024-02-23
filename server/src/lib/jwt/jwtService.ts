import jsonwebtoken from 'jsonwebtoken';

export const createToken = (id: string) => {
    const secret = process.env.JWT_SECRET as string;
    return jsonwebtoken.sign({ id }, secret, {
        expiresIn: '3d'
    });
};