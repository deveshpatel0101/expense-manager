import moment from 'moment';
const { GoogleSpreadsheet } = require('google-spreadsheet');

export const addRow = async (authJson, row) => {
  const doc = new GoogleSpreadsheet(
    '1iOo28ZrdtDkxqtkhbn3dPaUInBA3bJBjOzUuZKfcs7E'
  );

  await doc.useServiceAccountAuth(authJson);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[moment().format('YYYY')];
  sheet.addRow(row);
};
