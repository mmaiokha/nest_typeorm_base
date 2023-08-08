import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const CurrentUser = createParamDecorator((data: any, ctx: ExecutionContextHost) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user ?? null
})