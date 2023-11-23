import * as request from '../ultils/request'

const REGISTER_ENDPOINT = "/api/auth/register"

export const register = async (name, email, password, province, district, ward, address) => {
    try {
        const response = await request.post(REGISTER_ENDPOINT,
            {
                name: name,
                email: email,
                password: password,
                province: province,
                district: district,
                ward: ward,
                address: address
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
        return response;
    } catch (error) {
        return error
    }
};

const LOGIN_ENDPOINT = "/api/auth/login"

export const login = async (email, password) => {
    try {
        return await request.post(LOGIN_ENDPOINT,
            {
                email: email,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
    } catch (error) {
        return error
    }
};

const LOGOUT_ENDPOINT = "/api/auth/logout"

export const logOut = async () => {
    try {
        return await request.post(LOGOUT_ENDPOINT);
    } catch (error) {
        return error
    }
};


const REFRESHTOKEN_ENDPOINT = "/api/auth/refresh-token"

export const refreshToken = async (refreshToken) => {
    try {
        return await request.post(REFRESHTOKEN_ENDPOINT,
            {
                refreshToken: refreshToken
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );
    } catch (error) {
        return error
    }
};