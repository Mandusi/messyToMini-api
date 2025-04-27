export default interface AuthPayload {
	id: string
	firstName: string
	lastName: string
	username: string
	token: string
	refreshToken?: string
}
