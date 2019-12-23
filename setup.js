module.exports = {
  url: 'mongodb://vimlesh:zuwLYrmBZ9DfrVB@mongodb-3511-0.cloudclusters.net:10005/angular-heroes?authSource=admin'
}

/** 
SSL URI
mongodb://<dbuser>:<dbpassword>@mongodb-3511-0.cloudclusters.net:10005/angular-heroes?authSource=admin&ssl=true&ssl_ca_certs=<ca.pem>

URI
mongodb://<dbuser>:<dbpassword>@mongodb-3511-0.cloudclusters.net:10005/angular-heroes?authSource=admin

Control Panel
https://clients.cloudclusters.io/database/mongodb/476e0a477f944024974be3932ff5977b/overview/

credentials:

username: vimlesh@jombay.com
password: zuwLYrmBZ9DfrVB 

SSL SHELL:
mongo -u vimlesh -p zuwLYrmBZ9DfrVB --ssl --sslCAFile /data/vimlesh/angular/ca.pem --authenticationDatabase "admin" mongodb-3511-0.cloudclusters.net:10005/angular-heroes

SHELL
mongo mongodb-3511-0.cloudclusters.net:10005/angular-heroes -u <dbuser> -p <dbpassword> --authenticationDatabase "admin"
*/

