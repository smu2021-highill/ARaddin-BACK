export interface UserDetail {
	photos: string[];
	code: string;
}

export interface User {
	username: string;
	userDetail: UserDetail;
}

export const collection = 'users';
