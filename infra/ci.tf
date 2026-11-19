# GitHub Actions から AWS へ公開するための設定。鍵は使わず、OIDC で一時的な権限を渡す。
variable "github_sub_prefix" {
  description = "OIDC トークンの sub の前半。このリポジトリは不変の ID 形式(use_immutable_subject)。gh api repos/<owner>/<repo>/actions/oidc/customization/sub の sub_claim_prefix で確認する(2026-11-19)"
  type        = string
  default     = "repo:1qLa@170410213/1qLa.github.io@1416528793"
}

variable "github_deploy_branch" {
  description = "公開を許すブランチ"
  type        = string
  default     = "main"
}

# このアカウントには、GitHub 用の OIDC プロバイダがまだない（2026-11-17 に確認）。
# 1 アカウントに 1 つだけ作れる。ほかの作品でも使うときは、ここを参照する。
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

# 信頼する相手は、このリポジトリの main ブランチだけ。
data "aws_iam_policy_document" "deploy_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["${var.github_sub_prefix}:ref:refs/heads/${var.github_deploy_branch}"]
    }
  }
}

resource "aws_iam_role" "deploy" {
  name                 = "portfolio-github-deploy"
  assume_role_policy   = data.aws_iam_policy_document.deploy_trust.json
  max_session_duration = 3600
}

# 渡す権限は、このバケットへの書き込みと、このディストリビューションの無効化だけ。
data "aws_iam_policy_document" "deploy" {
  statement {
    sid       = "ListBucket"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.site.arn]
  }

  statement {
    sid       = "WriteObjects"
    actions   = ["s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]
  }

  statement {
    sid       = "Invalidate"
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.site.arn]
  }
}

resource "aws_iam_role_policy" "deploy" {
  name   = "deploy-site"
  role   = aws_iam_role.deploy.id
  policy = data.aws_iam_policy_document.deploy.json
}

output "deploy_role_arn" {
  value = aws_iam_role.deploy.arn
}
