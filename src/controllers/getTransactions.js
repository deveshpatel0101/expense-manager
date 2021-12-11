import moment from 'moment';
const { GoogleSpreadsheet } = require('google-spreadsheet');

export const getTransactions = async (
  authJson,
  limit = undefined,
  offset = undefined
) => {
  const doc = new GoogleSpreadsheet(
    '1iOo28ZrdtDkxqtkhbn3dPaUInBA3bJBjOzUuZKfcs7E'
  );
  await doc.useServiceAccountAuth(authJson);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[moment().format('YYYY')];
  const rows = await sheet.getRows({ limit, offset });
  return rows;
};
