import { createParamDecorator } from '@nestjs/common';
import { Role } from '../../data/entities/role.entity';
import { UserRole } from '../enums/user-role.enum';

export const IsAdmin = createParamDecorator((data, req) => {
    const roles: Role[] = req.user.roles;
    let isAdmin: boolean = false;
    roles.forEach((role) => {
        if (role.name === 'Admin') {
            isAdmin = true;
        }
    });
    return isAdmin;
});
