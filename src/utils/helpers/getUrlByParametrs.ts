import { ParamType } from "@mytypes/param/param.types";
import { validationParams } from "./validationParams";

function getUrlByParametrs(
  defaultUrl: string,
  params: Record<string, ParamType>,
) {
  const url = new URL(defaultUrl);

  const validParams = validationParams(params);

  const keys = Object.keys(validParams);

  keys.forEach((key) => {
    const param = params[key];

    url.searchParams.append(
      key,
      typeof param === "string" ? param : JSON.stringify(param),
    );
  });

  return url;
}

export { getUrlByParametrs };
