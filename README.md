# Web Messenger

### Overview

“Web Messenger” is a web-based instant messaging application developed using Next.js for the frontend and GraphQL for the backend. Users can register, log in, create chats, exchange messages, search for other users and customize the theme of the application.

![Dark theme](https://i.imgur.com/w616efa.png "Dark theme")

### Technologies

**Frontend:**

Next.js, Apollo Client, Material UI, Socket.io Client

**Backend:**

Node.js, Express.js, Apollo Server, Prisma ORM, SQLite, Socket.io, Bcrypt, JWT

### Functionality

- **Registration and Login:** Users can create accounts by providing an email address, username and password, and upload an avatar. Upon login, users receive access tokens and authentication updates.
- **Messaging:** Users can create chats, send and receive text messages in real time.
- **User Search:** Users can search for other users by name.
- **Themes:** Users can switch between light and dark themes.

### Project Operation

1. User interacts with the interface created with Next.js and Material UI.
2. The client sends a GraphQL query to the server via Apollo Client.
3. The server processes the query using Apollo Server and Prisma ORM to interact with the database.
4. The server returns the data to the client in JSON format.
5. The client updates the user interface by displaying the received data.
6. Socket.io is used for real-time interaction such as messaging.

### Running the project locally

1. Clone repository `git clone https://github.com/Hire-Hoffee/Web-Messenger.git`
2. Install dependencies `cd ./client; npm install`, `cd ./server; npm install`
3. Add the `.env` file to the `./server` folder with the following properties:
   - PORT = `4000`
   - SECRET_ACCESS = `DUBnNNBLDn3jTrq6uXoKGD2ZWWQkFfaHW`
   - SECRET_REFRESH = `soxXpor9R2skFIeQ64ZCl0wUClka6yR4`
   - DATABASE_URL = `"file:./dev.db"`
   - CLIENT_URL = `http://localhost:3000`
4. Run a database migration with `cd ./server; npx prisma migrate dev --name init`
5. Start both `client` and `server` servers using the `npm run dev` command in the `./client` and `./server` folders
6. The project will be available at `http://localhost:3000`
