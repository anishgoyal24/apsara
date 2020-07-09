#!/bin/bash

# Deploy the Apsara gallery

pm2 stop apsara

pm2 delete apsara

cd Client/

npm install &

wait

npm run prod &

wait

cd -

cd Backend/server

npm install &

wait

pm2 start "npm run dev" --name apsara

