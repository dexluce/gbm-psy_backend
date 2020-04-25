import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './user.model';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const targetRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!targetRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    return this.matchRoles(targetRoles, user.role);
  }

  private matchRoles(targetRoles: string[], userRole: Role): boolean {
    return targetRoles.includes(userRole);
  }
}