/** 중앙집중식 error 처리
 * [참고] https://www.toptal.com/nodejs/node-js-error-handling
 */
export enum HttpStatusCode {
	OK = 200,
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	INTERNAL_SERVER = 500,
}

class BaseError extends Error {
	public readonly name: string;
	public readonly httpCode: HttpStatusCode;
	public readonly isOperational: boolean;

	constructor(
		name: string,
		httpCode: HttpStatusCode,
		description: string,
		isOperational: boolean
	) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name;
		this.httpCode = httpCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}
}

class APIError extends BaseError {
	constructor(
		name: string,
		httpCode = HttpStatusCode.INTERNAL_SERVER,
		description = 'internal server error',
		isOperational = true
	) {
		super(name, httpCode, description, isOperational);
	}
}
