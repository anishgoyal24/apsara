/**
 * This function is responsible for initilising the production configuration and environment variables
 */
function prodConfigInit() {

  // Node Environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'

  // Application Port
  process.env.PORT = process.env.PORT ||'5000'

  // Application Host
  process.env.HOST = process.env.HOST ||'0.0.0.0'

  // Database Url String
  process.env.dbURL = process.env.dbURL || 'mongodb://mongodb:27017/apsara' || 'mongodb://127.0.0.1:27017/apsara'

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER = process.env.FILE_UPLOAD_FOLDER ||`${__dirname}/uploads/`


};

export { prodConfigInit as productionConfig } 
