// src/auth/no-manager.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class NoManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("the user from the token ",user);
    

    if (user?.role === 'manager') {
      throw new ForbiddenException('your role is manager You are not able to perform this task');
    }

    return true; // allow others (admin, user, etc.)
  }
}
