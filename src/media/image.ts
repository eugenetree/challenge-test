import { ID } from "src/_common/types";

export class Image {
	id: ID;
	originalFilename: string;
	generatedFilename: string;
	userId: ID | null;
};