build:
	rm -rf frontend/dist
	npm run build

start:
	make start-backend

start-backend:
	npx start-server -s ./frontend/dist