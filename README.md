# Dinner Party App
Description here ...


## Important Links
[Github Repo](https://github.com/dennisrcao/dinner-party) <br>
[Google Cloud Console](https://console.cloud.google.com) <br>
[Amazon RDS Console](https://console.aws.amazon.com/rds) <br>

## Getting Started

Clone the repository, cd into the repo ```dinner-party```

### Build FrontEnd

First, cd into **frontend** repo
```bash
cd frontend
npm install
```

Next create a ```.env.local``` inside of repo ```dinner-party```

here's mine for example:
```base
GOOGLE_CLIENT_ID=<SENSITIVE>
GOOGLE_CLIENT_SECRET=<SENSITIVE>
NEXTAUTH_URL=http://localhost:3000

PORT=5001
DATABASE_URL=postgresql://dennisrcao:Denn15c40.@dinnerparty.cu5uiqqs8k9e.us-east-2.rds.amazonaws.com:5432/dinnerparty?ssl=true
DB_USER=dennisrcao
DB_HOST=dinnerparty.cu5uiqqs8k9e.us-east-2.rds.amazonaws.com
DB_NAME=dinnerparty
DB_PASS=<SENSITIVE>
DB_PORT=5432
```

Then to rebuild and serve the webpage
```
npm run build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build BackEnd
First, cd into **backend** repo
```bash
cd backend
npm install
```

Then to rebuild and deploy the server run
```
npm run build
npm run dev
```
Open [http://localhost:5001/attendees](http://localhost:5001/attendees)


npm run dev will build and start (npm run start command bypasses SSL security using flag NODE_TLS_REJECT_UNAUTHORIZED='0')



### Database

Access database & view PostgreSQL data:
```bash
psql -h dinnerparty.cu5uiqqs8k9e.us-east-2.rds.amazonaws.com -U dennisrcao -p 5432 -d dinnerparty
```
Then enter password

Database admin panel:

Open [http://localhost:3000/admin-page](http://localhost:3000/admin-page)



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
