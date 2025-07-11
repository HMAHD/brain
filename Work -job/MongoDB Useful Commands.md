
## 1. Connect to MongoDB

To access your MongoDB instance using `mongosh`, run:

```sh
mongosh
```

Or, if using MongoDB shell with authentication:

```sh
mongosh -u <username> -p <password> --authenticationDatabase admin
```

## 2. Show Available Users

To list all users in the current database:

```js
db.getUsers()
```

To list users from the `admin` database:

```js
use admin
db.system.users.find().pretty()
```

## 3. Get MongoDB Connection URL

To get the MongoDB connection URL, check the configuration file:

```sh
cat /etc/mongod.conf | grep bindIp
```

Or, if using a Docker container:

```sh
docker inspect <container_id> | grep MONGO_INITDB_ROOT_USERNAME
```

## 4. Show Available Databases

```js
show dbs
```

## 5. Show Available Collections in a Database

```js
use <database_name>
show collections
```

## 6. Find All Documents in a Collection

```js
db.<collection_name>.find().pretty()
```

## 7. Check MongoDB Service Status (Linux)

```sh
systemctl status mongod
```

## 8. Start/Stop/Restart MongoDB Service (Linux)

```sh
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl restart mongod
```

## 9. Get MongoDB Logs

```sh
tail -f /var/log/mongodb/mongod.log
```

## 10. Exit MongoDB Shell

```js
exit
```

---

These commands will help you manage and troubleshoot your MongoDB instance efficiently. 🚀