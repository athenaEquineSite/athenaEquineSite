import DatauriParser from 'datauri/parser';
import path from 'path';

const parser = new DatauriParser();
export const formatBufferTo64 = (file) => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}