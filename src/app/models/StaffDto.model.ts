import {Gender} from "./enumerations/Gender.enum";
import {Position} from "./enumerations/Position.enum";
import {Department} from "./enumerations/Department.enum";


export class StaffDto{

  firstName !: string
  lastName !: string
  email !: string
  address !: string
  phone !: string
  cin !: string
  date_of_birth !: Date
  date_of_start !: Date

  gender !: Gender
  position !: Position
  department !: Department


}
