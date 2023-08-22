# Web Messenger

### Local Setup

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
