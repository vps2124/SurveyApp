export class Survey {

    constructor(
        public id?: number,
        public active?: boolean,
        public surveyName?: String,
        public surveyExpDate?: String,
        public surveyURL?: String,
        public surveyEmail?: String,
        public surveyTrigger?: String,
        public surveyAccessibility?: String

    ) {
    }
}