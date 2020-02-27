// const Ajv = require('ajv');
// const ajvErrors = require('ajv-errors');

// const ajv = ajvErrors(
//   new Ajv({
//     allErrors: true,
//     jsonPointers: true,
//     $data: true,
//     loadSchema: uri => {
//       return new Promise((resolve, reject) => {
//         resolve(require(`./schema${uri}`));
//       });
//     }
//   })
// );

// ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

// module.exports = ajv;
