// import { Column } from "typeorm";

import { IsNotEmpty } from 'class-validator';

export class WebBrowserDtoPatch {
  @IsNotEmpty()
  WebBrowserName: string;
}
