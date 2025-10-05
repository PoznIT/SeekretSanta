# build
docker-compose build --no-cache
# release
docker push pozniako/seekretsanta-frontend:latest
docker push pozniako/seekretsanta-backend:latest
# deploy
scp docker-compose.yml ubuntu@83.228.210.115:deploys/docker-compose.yml
ssh ubuntu@83.228.210.115 "cd deploys && sudo docker compose pull && sudo docker compose up -d"
