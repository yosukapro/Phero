SHELL := bash

startServer: ## Start react-native android app
	yarn start

startApp: ## Start react-native android app
	react-native run-android

release: ## Create new apk in android/app/build/outputs/bundle/release/
	./gradlew assembleRelease

lint: ## Run eslint
	yarn lint

test: ## Run Jest tests
	yarn test

help:
	@echo "PHERO React-Native Tasks"
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""
