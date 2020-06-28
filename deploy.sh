#!/bin/bash

# Deploy the Apsara gallery

cd Client/

npm run prod &

wait

cd -

cd Backend/server

pm2 start "npm run dev" --name apsara

