import {jwtDecode} from 'jwt-decode';

export function decodeToken(token: any) {
    try {
        return jwtDecode(token); // Decodes the token payload without verifying
    } catch (error) {
        console.error("Failed to decode token", error);
        return null;
    }
}
