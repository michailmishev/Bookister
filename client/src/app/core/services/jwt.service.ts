import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class JWTService {
    public JWTDecoder(token: string) {
        return JWT(token);
    }
}
