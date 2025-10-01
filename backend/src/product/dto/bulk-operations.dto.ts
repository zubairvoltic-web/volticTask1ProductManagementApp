import { IsArray, IsNotEmpty } from 'class-validator';

export class BulkOperationDto {
  @IsArray()
  @IsNotEmpty()
  operations: any[]; // could be typed better, but keep flexible for now
}
