include .env

ifeq ($(ENV),development)
    compose_file_path := docker/dev/docker-compose.yml
else
    compose_file_path := docker/prod/docker-compose.yml
endif

up: # create and start containers
	docker-compose --env-file .env -f ${compose_file_path} up 

build: # build containers
	docker-compose --env-file .env -f ${compose_file_path} build --no-cache

stop: # stop containers, but not destroy
	docker-compose --env-file .env -f ${compose_file_path} stop

down: # stop and destroy containers
	docker-compose --env-file .env -f ${compose_file_path} down

down-volume: #  WARNING: stop and destroy containers with volumes
	docker-compose --env-file .env -f ${compose_file_path} down -v

restart: down up

ps: # show started containers and their status
	docker-compose --env-file .env -f ${compose_file_path} ps

connect_nest:
	docker-compose --env-file .env -f ${compose_file_path} exec nest bash

connect_db:
	docker-compose --env-file .env -f ${compose_file_path} exec mysql bash

db_push: 
	docker-compose --env-file .env -f ${compose_file_path} exec nest npx prisma db push --schema=database/schema.prisma

db_reset:
	docker-compose --env-file .env -f ${compose_file_path} exec nest npx prisma migrate reset --schema=database/schema.prisma

db_migrate:
	docker-compose --env-file .env -f ${compose_file_path} exec nest npx prisma migrate dev --schema=database/schema.prisma