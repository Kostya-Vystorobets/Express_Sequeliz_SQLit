import CustomHTTPError from '../errors/index';

export default function errorHandler(err, req, res, next) {
    console.error('Error in errors middleware:\n', err.stack);
    if (err instanceof CustomHTTPError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
}
