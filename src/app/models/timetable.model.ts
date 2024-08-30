export interface ClassEntity {
    id: number;
    name: string;
    nbOfStudents: number;
}

export interface Teacher {
    id: number;
    fullName: string;
    email: string;
    phoneNo: string;
}

export interface Timeslot {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

export interface Room {
    id: number;
    name: string;
    capacity: number;
    materielIds: number[] | null;
}

export interface Subject {
    id: number;
    name: string;
    coefficient: number;
    teacherId: number;
}

export interface Session {
    id: number;
    teacher: Teacher;
    classEntity: ClassEntity;
    room: Room;
    timeslot: Timeslot;
    subject: Subject;
}

export interface TimetableData {
    solverStatus: string;
    classList: ClassEntity[];
    roomList: Room[];
    subjectList: Subject[];
    teacherList: Teacher[];
    timeslotList: Timeslot[];
    sessionList: Session[];
}
