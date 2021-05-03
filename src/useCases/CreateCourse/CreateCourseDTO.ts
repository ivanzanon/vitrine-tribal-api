export interface ICreateCourseRequestDTO {
    title: string;
    teacher: {
        id: string
    };
    description: string;
    location: string;
    price: number;
    dateStart: number;
    dateEnd: number;
    hourStart: number;
    hourEnd: number;
    interval: string;
    inscriptionUrl: string;
}
