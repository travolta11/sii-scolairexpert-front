export class Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    gender: string;
    level: string;
    classId: number;
    className?: string;
    dateOfBirth:Date;
    parentId: number;
    absenceChecked?: boolean;
    absenceDisabled?: boolean;
    tardinessChecked?: boolean;
    tardinessDisabled?: boolean;
    absenceReason?: string;
    tardinessReason?: string;
  
    constructor(
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      phoneNumber: string,
      address: string,
      zipCode: string,
      gender: string,
      level: string,
      classId: number,
      dateOfBirth:Date,
      parentId: number
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.zipCode = zipCode;
      this.gender = gender;
      this.level = level;
      this.classId = classId;
      this.dateOfBirth = dateOfBirth;
      this.parentId = parentId;
    }
  }
  
