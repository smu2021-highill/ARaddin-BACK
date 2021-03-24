// export interface UserDetail {
// 	photos: string; //얼굴 인식 관련 모델
// 	code: string; //현재 접속한 방
// }

export interface User {
	// email: string;
	nickname: string; //닉네임
	photo: string; //얼굴 인식 관련 모델
	code: string; //현재 접속한 방
	// userDetail: UserDetail;
}

export const collection = 'users';
