
# Vault Hunters - Custom Armoury



## Installation

- Clone both this project and the API into your documents

```bash
  git clone https://github.com/RSNFreud/catalyst-site && 
  git clone https://github.com/RSNFreud/catalyst-api
```

- Rename .env.public to .env


### Catalyst-Site env file

- Set `REACT_APP_API_URL` to the URL of the API you are hosting (where the data is being taken from your server)
- Set `REACT_APP_SERVER_NAME` to the name of your vault hunters server. It can be whatever you want.

### Catalyst-API env file
- Fill the options out here according to your server:

```
Host: The URL of your server/VPS
Port: What port it's running on
User: The username for your server
Password: The password for your server
```

### Starting the server
- To start the API use `node .`
- To start the Site use `yarn start` or `npm run start`
