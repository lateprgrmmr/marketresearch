import daos from '..';
import { UserUXRecord } from '../../shared/types/users';
import { Connection } from '../connection';

export default class UserDAO {

    async findAllRecords(db: Connection, params: {
        userIds?: number[],
        entityId?: number,
        includeDeleted?: boolean,
    }): Promise<UserUXRecord[]> {
        const { userIds, entityId, includeDeleted } = params;

        if (userIds && userIds.length === 0) {
            return [];
        }

        const records: UserUXRecord[] | null = await db.users.findUserUX({
            userIdList: userIds || null,
            entityId: entityId !== undefined ? entityId : null,
            includeDeleted,
        });
        if (!records || records.length === 0) {
            return [];
        } else {
            return records;
        }
    }
}