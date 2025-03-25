import * as AuthService from '../services/AuthService'

const resetParams = {
	password: 'myNewPassword',
	token:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzA4MzUyOTQxLCJleHAiOjE3MDgzNTMyNDF9.HvgJOJU_mX92Ag_iqd7-JJOVEilDAPFPQf2qUelvpA4',
}

AuthService.resetPassword(resetParams)
