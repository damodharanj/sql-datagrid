import { faker } from '@faker-js/faker';

export const generateID = () => "id" + Math.random().toString(16).slice(2);

export const generateMetaData = (columnCount = 7) => {
  const count = Math.ceil((Math.random() * columnCount));
  const columns = [];
  for (let i=0; i<count; i++) {
    columns.push({
      title: faker.word.noun(),
      width: 100
    })
  }
  return columns;
}



export const generateRowData = (rows = 500, columns = 7) => {
    const rowsAcc = [];
    for (let i=0;i<rows;i++) {
        const column = []
        for (let j=0; j<columns; j++) {
            column.push(faker.word.noun());
        }
        rowsAcc.push(column)
    }
    return rowsAcc;
}

export const createEditor = (query) => ({
  id: generateID(),
  query,
  metaInfo: generateMetaData(),
  data: generateRowData()
});