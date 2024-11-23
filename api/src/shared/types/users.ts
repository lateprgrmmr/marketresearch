import * as t from 'io-ts';

export interface UserUXRecord {
    id: number;
    entity_id: number;
    email: string;
    phone: string;
}