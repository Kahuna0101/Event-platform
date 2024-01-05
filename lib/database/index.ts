import mongoose from 'mongoose';

const MOGODB_URI = process.env.MOGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if(!MOGODB_URI) throw new Error('MONGODB_URI is missing');

    cached.promise = cached.promise || mongoose.connect(MOGODB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}