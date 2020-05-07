terraform {
  required_version = ">= 0.12"
}

# -----------------------------------------------------------------------------
# PREPARE PROVIDERS
# -----------------------------------------------------------------------------

provider "google" {
  credentials = var.gcp_credentials
  project     = var.project_id
  region      = var.region
}

provider "google-beta" {
  credentials = var.gcp_credentials
  project     = var.project_id
  region      = var.region
}

# -----------------------------------------------------------------------------
# Enable APIs
# -----------------------------------------------------------------------------

resource "google_project_service" "cloud-build-api" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "gcr-api" {
  service            = "containerregistry.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "cloud-run-api" {
  service            = "run.googleapis.com"
  disable_on_destroy = true
}

resource "google_project_service" "cloud-source-manager-api" {
  service            = "cloudresourcemanager.googleapis.com"
  disable_on_destroy = true
}

# -----------------------------------------------------------------------------
# CREATE A CLOUD BUILD TRIGGER
# -----------------------------------------------------------------------------

resource "google_cloudbuild_trigger" "studio-andy-deploy" {
  provider = google-beta
  name     = "studio-andy-deploy"
  filename = "./cloudbuild.yaml"

  substitutions = {
    _SENTRY_DSN           = var.SENTRY_DSN
    _SENTRY_AUTH_TOKEN    = var.SENTRY_AUTH_TOKEN
    _CTF_SPACE_ID         = var.CTF_SPACE_ID
    _CTF_CDA_ACCESS_TOKEN = var.CTF_CDA_ACCESS_TOKEN
    _CLOUDFLARE_ZONE_ID = var.CLOUDFLARE_ZONE_ID
    _CLOUDFLARE_USER_EMAIL = var.CLOUDFLARE_USER_EMAIL
    _CLOUDFLARE_API_KEY = var.CLOUDFLARE_API_KEY
  }

  github {
    owner = "andoshin11"
    name  = "studio-andy"
    push {
      branch = "master"
    }
  }

  depends_on = [
    google_project_service.cloud-build-api,
    google_project_service.gcr-api,
    google_project_service.cloud-run-api,
    google_project_service.cloud-source-manager-api
  ]
}

# -----------------------------------------------------------------------------
# CREATE Cloud Run Service
# -----------------------------------------------------------------------------

data "google_container_registry_image" "nuxt" {
  name = "nuxt"
  region = "asia"
  tag = "latest"
}

resource "google_cloud_run_service" "studio-andy" {
  name     = "studio-andy"
  location = "asia-northeast1"

  template {
    metadata {
      labels = {
        environment = "production"
      }
    }
    spec {
      containers {
        image = data.google_container_registry_image.nuxt.image_url
        resources {
          limits = { "memory" : "512Mi" }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.studio-andy.location
  project  = google_cloud_run_service.studio-andy.project
  service  = google_cloud_run_service.studio-andy.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
