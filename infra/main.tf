terraform {
  required_version = ">= 1.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # bucket、key、region、profile、allowed_account_ids は backend.hcl に書く（Git に入れない）。
  # terraform init -backend-config=backend.hcl
  backend "s3" {
    encrypt      = true
    use_lockfile = true
  }
}

variable "allowed_account_id" {
  description = "このサイトを作ってよい AWS アカウント ID（terraform.tfvars に書く。Git に入れない）"
  type        = string
}

variable "aws_profile" {
  description = "AWS CLI のプロファイル名（terraform.tfvars に書く）"
  type        = string
}

variable "domain_name" {
  type    = string
  default = "1qla.com"
}

locals {
  project = "portfolio"
  domains = [var.domain_name, "www.${var.domain_name}"]

  tags = {
    Project     = local.project
    Environment = "prod"
    ManagedBy   = "terraform"
  }
}

provider "aws" {
  region              = "ap-northeast-1"
  profile             = var.aws_profile
  allowed_account_ids = [var.allowed_account_id]

  default_tags {
    tags = local.tags
  }
}

# CloudFront の証明書は us-east-1 に作る決まり。
provider "aws" {
  alias               = "us_east_1"
  region              = "us-east-1"
  profile             = var.aws_profile
  allowed_account_ids = [var.allowed_account_id]

  default_tags {
    tags = local.tags
  }
}

# ホストゾーンは、ドメイン登録で作られたものを参照する（新しく作らない）。
data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

data "aws_caller_identity" "current" {}
