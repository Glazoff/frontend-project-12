install:
	npm ci
	make -C frontend install

build:
	rm -rf frontend/dist
	npm run build

start:
	make start-backend

start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend start

develop:
	make start-backend & make -C frontend develop