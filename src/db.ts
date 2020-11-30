import pgPromise from 'pg-promise';

const pgp = pgPromise({/* Initialization Options */});
export const db = pgp("postgres://postgres:install@localhost:5432/wallet");
