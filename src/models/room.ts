interface Setting {
	treasureCount: number; //보물 개수
	timeLimit: number; //시간(분단위)
	place: number; //장소 (0,1)
}
export interface Room {
	master: string;
	users: string[];
	setting: Setting;
}

export const collection = 'rooms';
