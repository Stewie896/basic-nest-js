/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
//   IsDate,
  IsNumber,
} from 'class-validator';

export class Vali_dator {
  @IsNotEmpty({ message: 'This felid canoot be empty' })
  @IsString({ message: 'Title should be string' })
  @MinLength(10, { message: 'Title length be < than 10 char' })
  @MaxLength(30, { message: 'Title should not be > 30 char' })
  title: string;

//   @IsDate({ message: 'The input should be date' })
//   date: Date;

  @IsNotEmpty({ message: 'Feild cannot be empty' })
  @IsString({
    message: 'Invalid input shloud can only be combination of int and str',
  })
  description: string | number;

  @IsNotEmpty({ message: 'Feild should not be empty' })
  @IsString({ message: 'Feild should be string' })
  @MaxLength(10 , {message: "Limit exceeded"})
  publisher: string;

  @IsNotEmpty({ message: 'The value cannot be empty' })
  @IsNumber({}, { message: 'Feild should be number' })
  estimated_Target: number

//   @IsDate({ message: 'The input should be date' })
//   created_at: Date;

//   @IsDate({ message: 'The input should be date' })
//   updated_at: Date;
// }
}
