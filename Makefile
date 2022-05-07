IMAGE=quay.io/gitter/gitter-app
TAG_DEV=latest
DOCKERFILE_DEV=Dockerfile
TAG_PROD=1.0.0
DOCKERFILE_PROD=Dockerfile_prod
BUILD_DIR=.
PORT=3000

_build-docker:
	docker build --build-arg PORT=$(PORT) -t $(IMAGE):$(TAG) -f $(DOCKERFILE) $(BUILD_DIR)
.PHONY: _build-docker

_deploy-docker:
	docker push $(IMAGE):$(TAG)
.PHONY: _deploy-docker


build-docker-dev:
	$(MAKE) _build-docker TAG=$(TAG_DEV) DOCKERFILE=$(DOCKERFILE_DEV) PORT=$(PORT)
.PHONY: build-docker-dev

build-docker-prod:
	$(MAKE) _build-docker TAG=$(TAG_PROD) DOCKERFILE=$(DOCKERFILE_PROD) PORT=$(PORT)
.PHONY: build-docker-prod

deploy-docker-dev:
	$(MAKE) _deploy-docker TAG=$(TAG_DEV)
.PHONY: _deploy-docker-dev

deploy-docker-prod:
	$(MAKE) _deploy-docker TAG=$(TAG_PROD)
.PHONY: deploy-docker-prod

run-docker-dev:
	docker run -p 3000:3000 -v $(PWD):/home/app $(IMAGE):$(TAG_DEV)
.PHONY: run-docker-dev

run-docker-prod:
	docker run -p 80:80 $(IMAGE):$(TAG_PROD)
.PHONY: run-docker-prod