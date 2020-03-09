import {IContext, init} from '../../context';
import Schema from '../../model/Schema';
import SchemaDAO from '../SchemaDAO';
import Data from '../../model/Data';
import DataDAO from '../DataDAO';

let context: IContext;
let dataDAO: DataDAO = null;
let schemaDAO: SchemaDAO = null;
beforeAll(async () => {
  context = await init({
    sqlLite: false,
    mysql: {
      host: 'localhost',
      tablePrefix: 'xform_',
      port: 3306,
      user: 'root',
      database: 'xform_test101',
    }
  });
  if (context) {
    dataDAO = context.dataDAO;
    schemaDAO = context.schemaDAO;
  }
});

test('test DataDAO', async () => {
  const data = new Data('888', {});
  const id = await dataDAO.insert(data);

  expect(id > 0).toBeTruthy();

  const dataList = await dataDAO.queryList('888', 0, 10);
  expect(dataList.length > 0).toBe(true);
});

test('test SchemaDAO', async () => {
  const schema = new Schema();
  schema.title = `TEST_SCHEMA_${Date.now()}`;
  const id = await schemaDAO.insert(schema);

  expect(id > 0).toBeTruthy();

  schema.id = id;
  const newTitle = `TEST_SCHEMA_2_${Date.now()}`;
  schema.title = newTitle;
  const updateResult = await schemaDAO.updateByUUID(schema);
  expect(updateResult).toBeTruthy();

  const querySchema = await schemaDAO.getById(id);
  expect(querySchema.title).toBe(newTitle);
});
