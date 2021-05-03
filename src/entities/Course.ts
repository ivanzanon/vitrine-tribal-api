export class Course {
    public readonly id: number;

    public title: string;

    public Teacher: {
      id: number;
      name: string;
    };

    public description: string;

    public location: string;

    public price: number;

    public dateStart: number;

    public dateEnd: number;

    public hourStart: number;

    public hourEnd: number;

    public interval: string;

    public inscriptionUrl: string;

    constructor(props: {id: number;
      title: string;
      Teacher: {
        id: string;
        name: string;
      };
      description: string;
      location: string;
      price: number;
      dateStart: number;
      dateEnd: number;
      hourStart: number;
      hourEnd: number;
      interval: string;
      inscriptionUrl: string;}) {
      this.validate(props);
      Object.assign(this, props);
    }

    private validate({
      description, dateEnd, dateStart, hourEnd, hourStart,
    }) {
      this.validateDescription(description);
      this.validateDate(dateStart, dateEnd);
      this.validateHour(hourStart, hourEnd);
    }

    private validateDescription(description: string) {
      return description;
    }

    private validateDate(dateStart: number, dateEnd: number) {
      return { dateStart, dateEnd };
    }

    private validateHour(hourStart: number, hourEnd: number) {
      return { hourStart, hourEnd };
    }
}
