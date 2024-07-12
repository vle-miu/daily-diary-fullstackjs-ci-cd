import { readFileSync, writeFileSync } from "fs";
import { join } from "node:path";
import { CustomError } from "../../utils/custom-error";

export class DiaryService {
    private data: Diary[] = [];
    private fullFilePath: string = "";

    constructor(public filename: string) {
        this.fullFilePath = join(__dirname, filename);
        try {
            const fileContent: string = readFileSync(
                this.fullFilePath,
                "utf-8"
            );
            this.data = JSON.parse(fileContent);
        } catch (error) {
            throw new CustomError(
                500,
                `Cannot read json file ${error.message}`
            );
        }
    }

    persist = (): void => {
        try {
            writeFileSync(this.fullFilePath, JSON.stringify(this.data));
        } catch (error) {
            throw new CustomError(
                500,
                `Cannot write json file: ${error.message}!`
            );
        }
    };

    getAllDiary = (): Diary[] => {
        return this.data;
    };

    getDiaryById = (id: string): Diary => {
        return this.data.find((e) => e.id === id) as Diary;
    };

    addDiary = (diary: Diary): Diary => {
        this.data = [...this.data, diary];
        this.persist();
        return diary;
    };

    updateDiaryVotedById = (id: string, votes: number): Diary | null => {
        let diary: Diary | null = null;
        this.data = this.data.map((e) => {
            if (e.id === id) {
                e.vote = votes;
                diary = e;
            }
            return e;
        });
        this.persist();
        return diary;
    };
}
