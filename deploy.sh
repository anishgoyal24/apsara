#!/bin/bash

# Deploy the Apsara gallery

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

