import { ParamType } from "@mytypes/param/param.types";

function validationParams(params: Record<string, ParamType>) {
  const validatedParams: Record<string, ParamType> = {};

  const keys = Object.keys(params);

  for (const key of keys) {
    const param = params[key];

    if (param === undefined) {
      continue;
    }

    validatedParams[key] = typeof param === "string" ? param.trim() : param;
  }

  return validatedParams;
}
export { validationParams };
