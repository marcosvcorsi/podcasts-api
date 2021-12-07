terraform {
  backend "remote" {
    organization = "marcosvcorsi"

    workspaces {
      name = "podcasts-api"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role_ssm_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role_ecs_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = "podcasts-api"
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = "podcast-api-tf"
  requires_compatibilities = ["EC2"]
  memory                   = "128"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([
    {
      name  = "podcast-api"
      image = "989105994412.dkr.ecr.us-east-1.amazonaws.com/podcasts-api:latest"
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 80
        }
      ]
      secrets = [
        {
          name      = "MONGO_URI"
          valueFrom = "arn:aws:ssm:us-east-1:989105994412:parameter/MONGO_URI"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "podcasts-api",
          "awslogs-region"        = "us-east-1",
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "service" {
  name            = "podcasts-api-service"
  cluster         = "default"
  launch_type     = "EC2"
  desired_count   = 1
  task_definition = aws_ecs_task_definition.task_definition.arn
}
