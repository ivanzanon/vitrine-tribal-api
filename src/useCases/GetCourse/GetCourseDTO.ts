export interface GetCourseResponseDTO {
    id: string;
    title: string;
    teacher: string;
    description: string;
    price: number;
    dateStart: number;
    dateEnd: number;
    hourStart: number;
    hourEnd: number;
    interval: string;
    inscriptionUrl: string;
}
