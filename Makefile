include .env

PROJECT := $(PROJECT_ID)
NAME := nuxt
VERSION := $(shell echo `git rev-parse --short --verify HEAD`)
TAG := asia.gcr.io/$(PROJECT)/$(NAME):$(VERSION)
DOCKER_BUILD_OPTS += -t $(TAG)
DOCKER_BUILD_ARGS += \
	--build-arg CTF_SPACE_ID=$(CTF_SPACE_ID) \
	--build-arg CTF_CDA_ACCESS_TOKEN=$(CTF_CDA_ACCESS_TOKEN) \
	--build-arg SENTRY_DSN=$(SENTRY_DSN) \
	--build-arg SENTRY_AUTH_TOKEN=$(SENTRY_AUTH_TOKEN) \
	--build-arg RELEASE_VERSION=local

.PHONY: release-build
release-build:
	docker build $(DOCKER_BUILD_OPTS) $(DOCKER_BUILD_ARGS) .

.PHONY: push-image
push-image:
	docker push $(TAG)
