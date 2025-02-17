declare module "@*.interface.ts";
declare module "@*.tsx";
declare module "@*.jsx";
declare module "@*.js";
declare module "@*.ts";
declare module "@*.types.ts";
declare module "@*";
declare module "*.interface.ts";
declare module ".tsx";
declare module ".jsx";
declare module ".ts";
declare module ".scss";
declare module ".sass";
declare module "*.module.css";
declare module "*.module.scss";
declare module "*.module.sass";
declare module "*.webp";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
